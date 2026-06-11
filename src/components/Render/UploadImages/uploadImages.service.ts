import { SUPABASE } from "@/constants";
import { ensureSupabaseAuthSession } from "@/services/auth.service";

const DEFAULT_BUCKET = "vehicle-images";
const DEFAULT_SIGNED_URL_EXPIRES_SECONDS = 60 * 60;
const MAX_ORIGINAL_FILE_SIZE_BYTES = 12 * 1024 * 1024;
const TARGET_COMPRESSED_SIZE_BYTES = 220 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

export interface IUploadVehicleImagesPayload {
  files: File[];
  itemKey: string;
  bucketName?: string;
  createSignedUrl?: boolean;
}

export interface IUploadedVehicleImage {
  bucket: string;
  path: string;
  signedUrl: string;
  fileName: string;
}

const ensureValidItemKey = (itemKey: string): void => {
  if (!itemKey || !itemKey.trim()) {
    throw new Error("Item key es requerido para relacionar la imagen en Supabase Storage.");
  }
};

const validateImageFile = (file: File): void => {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(`Formato no permitido para ${file.name}. Usa JPG, PNG o WEBP.`);
  }

  if (file.size > MAX_ORIGINAL_FILE_SIZE_BYTES) {
    throw new Error(`La imagen ${file.name} supera 12MB. Usa una imagen mas ligera.`);
  }
};

const replaceFileExtensionWithWebp = (name: string): string => {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex < 0) return `${name}.webp`;
  return `${name.slice(0, dotIndex)}.webp`;
};

const readImageElement = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`No se pudo leer la imagen ${file.name}.`));
    };
    img.src = objectUrl;
  });
};

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("No se pudo comprimir la imagen."));
          return;
        }
        resolve(blob);
      },
      "image/webp",
      quality,
    );
  });
};

const compressImageForUpload = async (file: File): Promise<File> => {
  const image = await readImageElement(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No se pudo inicializar el compresor de imagen.");
  }

  let width = image.naturalWidth || image.width;
  let height = image.naturalHeight || image.height;
  let quality = 0.82;
  let compressedBlob: Blob | null = null;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    compressedBlob = await canvasToBlob(canvas, quality);
    if (compressedBlob.size <= TARGET_COMPRESSED_SIZE_BYTES) {
      break;
    }

    quality = Math.max(0.45, quality - 0.08);
    width = width * 0.88;
    height = height * 0.88;
  }

  if (!compressedBlob) {
    throw new Error(`No se pudo comprimir la imagen ${file.name}.`);
  }

  return new File([compressedBlob], replaceFileExtensionWithWebp(file.name), {
    type: "image/webp",
    lastModified: Date.now(),
  });
};

export const getSignedVehicleImageUrl = async (
  path: string,
  bucketName = DEFAULT_BUCKET,
  expiresIn = DEFAULT_SIGNED_URL_EXPIRES_SECONDS,
): Promise<string> => {
  if (!path) {
    throw new Error("La ruta de la imagen es requerida para generar URL firmada.");
  }

  await ensureSupabaseAuthSession();

  const { data, error } = await SUPABASE.storage.from(bucketName).createSignedUrl(path, expiresIn);
  if (error || !data?.signedUrl) {
    throw error ?? new Error("No se pudo generar URL firmada para la imagen.");
  }

  return data.signedUrl;
};

export const uploadVehicleImages = async ({
  files,
  itemKey,
  bucketName = DEFAULT_BUCKET,
  createSignedUrl = false,
}: IUploadVehicleImagesPayload): Promise<IUploadedVehicleImage[]> => {
  ensureValidItemKey(itemKey);

  if (!files.length) {
    throw new Error("No hay archivos para cargar.");
  }

  await ensureSupabaseAuthSession();
  const cleanItemKey = itemKey.trim();

  const results: IUploadedVehicleImage[] = [];

  for (const file of files) {
    validateImageFile(file);
    const compressedFile = await compressImageForUpload(file);

    const filePath = `${cleanItemKey}.webp`;

    const { error: uploadError } = await SUPABASE.storage.from(bucketName).upload(filePath, compressedFile, {
      upsert: true,
      contentType: compressedFile.type,
      cacheControl: "3600",
    });

    if (uploadError) {
      throw uploadError;
    }

    const signedUrl = createSignedUrl ? await getSignedVehicleImageUrl(filePath, bucketName) : "";

    results.push({
      bucket: bucketName,
      path: filePath,
      signedUrl,
      fileName: `${cleanItemKey}.webp`,
    });
  }

  return results;
};
