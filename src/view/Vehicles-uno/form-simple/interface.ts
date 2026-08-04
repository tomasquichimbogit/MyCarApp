import { z } from "zod";

export const schemaFormSimpleVehicleUI = z.object({
  person_id: z.number().min(1, "Usuario no identificado"),
  license_plate: z
    .string()
    .min(1, "La placa es requerida")
    .max(10, "La placa es demasiado larga"),
});

export type TSchemaFormSimpleVehicleUI = z.infer<typeof schemaFormSimpleVehicleUI>;