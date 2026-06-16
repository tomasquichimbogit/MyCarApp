export const locationsKeys = {
  init: ["locations"] as const,
  provincias: () => [...locationsKeys.init, "provincias"] as const,
  cantones: (provinciaId: string) =>
    [...locationsKeys.init, "cantones", provinciaId] as const,
  parroquias: (provinciaId: string, cantonId: string) =>
    [...locationsKeys.init, "parroquias", provinciaId, cantonId] as const,
};
