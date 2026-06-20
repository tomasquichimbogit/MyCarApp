import { z } from "zod";

export const schemaCreateMaintenanceUI = z.object({
  vehicle_id: z.number({error: "El vehículo es requerido"}).min(1, "El vehículo es requerido"),
  workshop_id: z.number({error: "El taller es requerido"}).min(1, "El taller es requerido"),
  maintenance_type: z
    .string({error: "El tipo de mantenimiento es requerido"})
    .min(1, "El tipo de mantenimiento es requerido"),
  description: z.string().optional(),
  mileage: z.number().min(0, "El kilometraje no puede ser negativo").optional(),
  cost: z.number().min(0, "El costo no puede ser negativo").optional(),
  maintenance_date: z.string().min(1, "La fecha de mantenimiento es requerida").optional(),
});

export type ICreateMaintenanceUI = z.infer<
  typeof schemaCreateMaintenanceUI
>;