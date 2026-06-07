export const modelsKeys = {
  init: ["models"] as const,
  list: (brandId?: number) =>
    [...modelsKeys.init, "list", brandId ?? "all"] as const,
};
