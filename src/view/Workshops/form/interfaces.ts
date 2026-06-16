import { z } from "zod";

export const workshopScheduleSchema = z.object({
  monday: z.string().nullable().optional(),
  tuesday: z.string().nullable().optional(),
  wednesday: z.string().nullable().optional(),
  thursday: z.string().nullable().optional(),
  friday: z.string().nullable().optional(),
  saturday: z.string().nullable().optional(),
  sunday: z.string().nullable().optional(),
});

export const schemaWorkshopFormUI = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "El nombre del taller es requerido"),
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  phones: z.array(z.string()).default([]),
  emails: z.array(z.string().email("Correo inválido")).default([]),
  schedule: workshopScheduleSchema.optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  whatsapp: z.string().optional(),
  logo_url: z.string().optional(),
  cover_url: z.string().optional(),
  services: z.array(z.string()).default([]),
  rating: z.number().min(0).max(5).optional(),
  rating_count: z.number().min(0).optional(),
  is_active: z.boolean().default(true),
});

export type TSchemaWorkshopFormUI = z.infer<typeof schemaWorkshopFormUI>;
export type TWorkshopSchedule = z.infer<typeof workshopScheduleSchema>;
