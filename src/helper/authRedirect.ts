export function getAuthRedirectUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (import.meta.env.PROD) {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
    // HashRouter: Supabase agrega #access_token=... al hash.
    // Si incluimos #/verify-email aquí, queda doble hash (#/verify-email#access_token=...).
    return `${window.location.origin}${basePath}/`;
  }

  return `${window.location.origin}${normalizedPath}`;
}

export function parseAuthHashParams(): URLSearchParams | null {
  const rawHash = window.location.hash.slice(1);
  if (!rawHash) {
    return null;
  }

  let paramsSource = rawHash;

  // HashRouter + Supabase: /verify-email#access_token=...&type=signup
  const nestedHashIndex = paramsSource.indexOf("#");
  if (nestedHashIndex !== -1) {
    paramsSource = paramsSource.slice(nestedHashIndex + 1);
  } else if (paramsSource.startsWith("/")) {
    // Variante: /verify-email&access_token=...
    const separatorIndex = paramsSource.indexOf("&");
    if (separatorIndex === -1) {
      return null;
    }
    paramsSource = paramsSource.slice(separatorIndex + 1);
  }

  if (!paramsSource.includes("access_token=")) {
    return null;
  }

  return new URLSearchParams(paramsSource);
}

export function isSignupAuthCallback(): boolean {
  const params = parseAuthHashParams();
  return params?.get("type") === "signup" && Boolean(params.get("access_token"));
}

export function cleanAuthHashUrl(path: string): void {
  if (import.meta.env.PROD) {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    window.history.replaceState(
      {},
      document.title,
      `${window.location.origin}${basePath}/#${normalizedPath}`,
    );
    return;
  }

  window.history.replaceState({}, document.title, getAuthRedirectUrl(path));
}
