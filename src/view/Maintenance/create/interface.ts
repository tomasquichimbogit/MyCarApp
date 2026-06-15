import { z } from "zod";
export const schemaCreateMaintenanceUI = z.object({
    workshop_id: z.string().min(1, "El taller es requerido"),
    vehicle_id: z.string().min(1, "El vehículo es requerido"),
    description: z.string().min(1, "La descripción es requerida"),
})

export type ICreateMaintenanceUI = z.infer<typeof schemaCreateMaintenanceUI>;