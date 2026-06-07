export const personKeys = {
  init: ["person"] as const,
  current: (userId?: string) => [...personKeys.init, "current", userId ?? "none"] as const,
};
