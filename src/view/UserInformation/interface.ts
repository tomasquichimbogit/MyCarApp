import { z } from "zod";

export const schemaUserInformation = z.object({
  names: z.string().min(1, "Los nombres son requeridos"),
  last_names: z.string().min(1, "Los apellidos son requeridos"),
  phone: z.string().min(1, "El teléfono es requerido"),
  email: z.string().email("Email inválido"),
});

export type TSchemaUserInformation = z.infer<typeof schemaUserInformation>;
