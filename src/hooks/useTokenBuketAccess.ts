import { getSignedVehicleImageUrl } from "@/components/Render/UploadImages/uploadImages.service";
import { useEffect, useState } from "react";

interface UseTokenBuketAccessParams {
  bucketName: string;
  itemKey: string | number;
  extension?: string;
  expiresIn?: number;
  reloadKey?: number;
}

export const useTokenBuketAccess = ({
  bucketName,
  itemKey,
  extension = "webp",
  expiresIn,
  reloadKey = 0,
}: UseTokenBuketAccessParams) => {
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isCancelled = false;

    const loadSignedUrl = async () => {
      try {
        const signedUrl = await getSignedVehicleImageUrl(
          `${itemKey}.${extension}`,
          bucketName,
          expiresIn,
        );
        if (!isCancelled) {
          setUrl(signedUrl);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes("Object not found") && !message.includes("not_found")) {
          console.error("No se pudo obtener URL firmada del bucket:", error);
        }
        if (!isCancelled) {
          setUrl(undefined);
        }
      }
    };

    loadSignedUrl();
    return () => {
      isCancelled = true;
    };
  }, [bucketName, itemKey, extension, expiresIn, reloadKey]);

  return url;
};
