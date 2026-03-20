import { z } from "zod";
export const vehicleFormSchema = z.object({
    placa: z.string({error: "La placa es requerida"}).min(1).max(10, { message: "La placa debe tener entre 1 y 10 caracteres" }),
    marca: z.string({ error: "La marca es requerida" }),
    modelo: z.string({ error: "El modelo es requerido" }),
    anio: z.number({ error: "El año es requerido" }).min(1, { message: "El año es requerido" }),
    color: z.string({ error: "El color es requerido" }),
    propietario_id: z.number({ error: "El propietario es requerido" }).min(1, { message: "El propietario es requerido" }),
});