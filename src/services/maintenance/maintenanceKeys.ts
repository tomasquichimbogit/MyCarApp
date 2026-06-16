export const maintenanceKeys = {
  init: ["maintenance"] as const,
  list: () => [...maintenanceKeys.init, "list"] as const,
  detail: (maintenanceId: number) =>
    [...maintenanceKeys.init, "detail", maintenanceId] as const,
};
