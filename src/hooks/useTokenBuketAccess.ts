import { getSignedVehicleImageUrl } from "@/components/Render/UploadImages/uploadImages.service";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { useEffect, useState } from "react";

interface UseTokenBuketAccessParams {
  bucketName: string;
  itemKey: string | number;
  extension?: string;
  expiresIn?: number;
  reloadKey?: number;
}

interface ITokenBucketAccessCacheParams {
  bucketName: string;
  itemKey: string | number;
  extension?: string;
  expiresIn?: number;
}

interface ITokenBucketStorageCache {
  signedUrl: string;
  expiresAtMs: number;
}

const EXPIRATION_SAFETY_WINDOW_MS = 30 * 1000;

const getCacheKey = (bucketName: string, itemKey: string | number, extension: string) => {
  return `${LOCAL_STORAGE_KEYS.TOKEN_BOKET_STORAGE_VEHICLE_IMAGES}:${bucketName}:${itemKey}.${extension}`;
};

const parseSignedTokenExpirationMs = (signedUrl: string): number | null => {
  try {
    const token = new URL(signedUrl).searchParams.get("token");
    if (!token) return null;

    const [, payloadPart] = token.split(".");
    if (!payloadPart) return null;

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const normalized = `${base64}${"=".repeat((4 - (base64.length % 4)) % 4)}`;
    const payload = JSON.parse(window.atob(normalized)) as { exp?: number };
    if (!payload.exp) return null;

    return payload.exp * 1000;
  } catch {
    return null;
  }
};

const readSignedUrlCache = (cacheKey: string): ITokenBucketStorageCache | null => {
  try {
    const raw = localStorage.getItem(cacheKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ITokenBucketStorageCache;
    if (!parsed?.signedUrl || !parsed?.expiresAtMs) return null;

    const isExpired = Date.now() + EXPIRATION_SAFETY_WINDOW_MS >= parsed.expiresAtMs;
    if (isExpired) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

const writeSignedUrlCache = (cacheKey: string, signedUrl: string): void => {
  const expiresAtMs = parseSignedTokenExpirationMs(signedUrl);
  if (!expiresAtMs) return;

  const payload: ITokenBucketStorageCache = { signedUrl, expiresAtMs };
  localStorage.setItem(cacheKey, JSON.stringify(payload));
};

const clearInvalidSignedUrlCaches = (): void => {
  const prefix = `${LOCAL_STORAGE_KEYS.TOKEN_BOKET_STORAGE_VEHICLE_IMAGES}:`;
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(prefix)) continue;

    const raw = localStorage.getItem(key);
    if (!raw) {
      keysToRemove.push(key);
      continue;
    }

    try {
      const parsed = JSON.parse(raw) as ITokenBucketStorageCache;
      const tokenExpMs = parseSignedTokenExpirationMs(parsed?.signedUrl ?? "");
      const expiredByCache = !parsed?.expiresAtMs || Date.now() + EXPIRATION_SAFETY_WINDOW_MS >= parsed.expiresAtMs;
      const expiredByToken = !tokenExpMs || Date.now() + EXPIRATION_SAFETY_WINDOW_MS >= tokenExpMs;

      if (!parsed?.signedUrl || expiredByCache || expiredByToken) {
        keysToRemove.push(key);
      }
    } catch {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export const invalidateTokenBuketAccessCache = ({
  bucketName,
  itemKey,
  extension = "webp",
}: ITokenBucketAccessCacheParams): void => {
  const cacheKey = getCacheKey(bucketName, itemKey, extension);
  localStorage.removeItem(cacheKey);
};

export const refreshTokenBuketAccessCache = async ({
  bucketName,
  itemKey,
  extension = "webp",
  expiresIn,
}: ITokenBucketAccessCacheParams): Promise<string> => {
  const cacheKey = getCacheKey(bucketName, itemKey, extension);
  invalidateTokenBuketAccessCache({ bucketName, itemKey, extension });

  const signedUrl = await getSignedVehicleImageUrl(
    `${itemKey}.${extension}`,
    bucketName,
    expiresIn,
  );
  writeSignedUrlCache(cacheKey, signedUrl);
  return signedUrl;
};

export const useTokenBuketAccess = ({
  bucketName,
  itemKey,
  extension = "webp",
  expiresIn,
  reloadKey = 0,
}: UseTokenBuketAccessParams) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (itemKey === -1) return;
    let isCancelled = false;
    const cacheKey = getCacheKey(bucketName, itemKey, extension);
    clearInvalidSignedUrlCaches();

    const loadSignedUrl = async () => {
      const cached = readSignedUrlCache(cacheKey);
      if (cached) {
        return cached.signedUrl;
      }

      try {
        const signedUrl = await getSignedVehicleImageUrl(
          `${itemKey}.${extension}`,
          bucketName,
          expiresIn,
        );
        writeSignedUrlCache(cacheKey, signedUrl);
        return signedUrl;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!message.includes("Object not found") && !message.includes("not_found")) {
          console.error("No se pudo obtener URL firmada del bucket:", error);
        }
        localStorage.removeItem(cacheKey);
        throw error;
      }
    };

    loadSignedUrl()
      .then((signedUrl) => {
        if (!isCancelled) {
          setImageUrl(signedUrl);
          setIsError(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setImageUrl(undefined);
          setIsError(true);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [bucketName, itemKey, extension, expiresIn, reloadKey]);

  return { imageUrl, isError };
};
