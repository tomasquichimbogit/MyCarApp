import { z } from "zod";

const currentYear = new Date().getFullYear();

export const schemaFormVehicleUI = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  brand: z.number().min(1, "Selecciona una marca"),
  model: z.number().min(1, "Selecciona un modelo"),
  year: z
    .number()
    .min(1900, "Año inválido")
    .max(currentYear + 1, "Año inválido"),
  color: z.string().min(1, "Selecciona un color"),
  person_id: z.number().min(1, "Usuario no identificado"),
  license_plate: z
    .string()
    .min(1, "La placa es requerida")
    .max(10, "La placa es demasiado larga"),
});

export type TSchemaFormVehicleUI = z.infer<typeof schemaFormVehicleUI>;