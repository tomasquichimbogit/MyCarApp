import { z } from "zod";
import { ETypeVehicle } from "@/enums";

export const schemaFormSimpleVehicleUI = z.object({
  person_id: z.number().min(1, "Usuario no identificado"),
  type: z.nativeEnum(ETypeVehicle, { error: "Selecciona un tipo de vehículo" }),
  license_plate: z
    .string()
    .min(1, "La placa es requerida")
    .max(10, "La placa es demasiado larga"),
    color: z.string().optional(),
    year: z.number().min(1900, "Año inválido").max(new Date().getFullYear() + 1, "Año inválido").optional(),
});

export type TSchemaFormSimpleVehicleUI = z.infer<typeof schemaFormSimpleVehicleUI>;