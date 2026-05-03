import { useForm, type Control, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { WorkshopRecord } from "@/services/taller.service";

export const workhopsFormSchema = z.object({
  id: z.string({ error: "El id es requerido" }).optional(),
  nombre: z
    .string({ error: "El nombre es requerido" })
    .min(1, { message: "El nombre es requerido" })
    .max(120, { message: "El nombre debe tener máximo 120 caracteres" }),
  direccion: z
    .string({ error: "La dirección es requerida" })
    .min(1, { message: "La dirección es requerida" })
    .max(150, { message: "La dirección debe tener máximo 150 caracteres" }),
  telefono: z
    .string({ error: "El teléfono es requerido" })
    .min(7, { message: "El teléfono debe tener al menos 7 caracteres" })
    .max(20, { message: "El teléfono debe tener máximo 20 caracteres" }),
  especialidad: z
    .string({ error: "La especialidad es requerida" })
    .min(1, { message: "La especialidad es requerida" })
    .max(100, { message: "La especialidad debe tener máximo 100 caracteres" }),
});

export interface IWorkhopsFormUIProps {
  control: Control<WorkshopRecord>;
}

export interface IWorkhopsFormUI {
  control: Control<WorkshopRecord>;
}

export const useWorkhopsFormUI = (props: IWorkhopsFormUIProps): IWorkhopsFormUI => {
  const { control } = props;
  return { control };
};

export const useWorkhopsForm = (): UseFormReturn<WorkshopRecord> => {
  return useForm<WorkshopRecord>({
    mode: "all",
    resolver: zodResolver(workhopsFormSchema),
  });
};
