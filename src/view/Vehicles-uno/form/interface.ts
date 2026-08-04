import { z } from "zod";

const currentYear = new Date().getFullYear();

export const schemaFormVehicleUI = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  brand: z.number({error: "Selecciona una marca"}).min(1, "Selecciona una marca"),
  model: z.number({error: "Selecciona un modelo"}).min(1, "Selecciona un modelo"),
  year: z
    .number({error: "Año inválido"}).min(1900, "Año inválido")
    .min(1900, "Año inválido")
    .max(currentYear + 1, "Año inválido"),
  color: z.string({error: "Selecciona un color"}).min(1, "Selecciona un color"),
  person_id: z.number({error: "Usuario no identificado"}).min(1, "Usuario no identificado"),
  license_plate: z
    .string({error: "La placa es requerida"}).min(1, "La placa es requerida")
    .min(1, "La placa es requerida")
    .max(10, "La placa es demasiado larga"),
});

export type TSchemaFormVehicleUI = z.infer<typeof schemaFormVehicleUI>;