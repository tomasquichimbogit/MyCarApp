export const brandsKeys = {
  init: ["brands"] as const,
  list: () => [...brandsKeys.init, "list"] as const,
};
