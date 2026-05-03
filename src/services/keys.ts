import type { UseVehiclesQueryProps } from "./vehiculo.service";

export const VEHICLE_KEYS = {
    init: ["vehiculo"] as const,
    listFilters: (filters: UseVehiclesQueryProps) => [...VEHICLE_KEYS.init, filters] as const,
};

export const WORKSHOP_KEYS = {
    init: ["taller"] as const,
};

export const MAINTENANCE_KEYS = {
    init: ["mantenimiento"] as const,
};