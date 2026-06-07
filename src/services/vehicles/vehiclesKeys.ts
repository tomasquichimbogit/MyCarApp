export const vehiclesKeys = {
  init: ["vehicles"] as const,
  list: () => [...vehiclesKeys.init, "list"] as const,
};
