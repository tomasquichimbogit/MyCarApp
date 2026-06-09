export const workshopsKeys = {
  init: ["workshops"] as const,
  list: () => [...workshopsKeys.init, "list"] as const,
};
