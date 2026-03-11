import { z } from "zod";
export const vehicleFormSchema = z.object({
    placa: z.string().min(1),
    marca: z.string().min(1),
    modelo: z.string().min(1),
    anio: z.number().min(1),
    color: z.string().min(1),
    propietario_id: z.string().min(1),
});