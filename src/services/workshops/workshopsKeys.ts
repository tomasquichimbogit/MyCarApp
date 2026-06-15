export const workshopsKeys = {
  init: ["workshops"] as const,
  list: () => [...workshopsKeys.init, "list"] as const,
  detail: (workshopId: number) => [...workshopsKeys.init, "detail", workshopId] as const,
};
