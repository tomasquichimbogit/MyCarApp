import { useForm, type Control, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { MaintenanceRecord } from "@/services/maintenance.service";
import type { DefaultOptionType } from "antd/es/select";

export const maintenanceFormSchema = z.object({
  id: z.string({ error: "El id es requerido" }).optional(),
  vehiculo_id: z.string({ error: "El vehículo es requerido" }).min(1, { message: "Selecciona un vehículo" }),
  taller_id: z.string({ error: "El taller es requerido" }).min(1, { message: "Selecciona un taller" }),
  descripcion_servicio: z
    .string({ error: "La descripción es requerida" })
    .min(1, { message: "La descripción es requerida" })
    .max(500, { message: "Máximo 500 caracteres" }),
  costo: z.number({ error: "El costo es requerido" }).min(0, { message: "El costo debe ser mayor o igual a 0" }),
  fecha_servicio: z.string({ error: "La fecha es requerida" }).min(1, { message: "La fecha es requerida" }),
});

export interface IMaintenanceFormUIProps {
  control: Control<MaintenanceRecord>;
  vehicleOptions: DefaultOptionType[];
  workshopOptions: DefaultOptionType[];
}

export interface IMaintenanceFormUI extends IMaintenanceFormUIProps {}

export const useMaintenanceFormUI = (props: IMaintenanceFormUIProps): IMaintenanceFormUI => props;

export const useMaintenanceForm = (): UseFormReturn<MaintenanceRecord> => {
  return useForm<MaintenanceRecord>({
    mode: "all",
    resolver: zodResolver(maintenanceFormSchema),
  });
};

export const isoToDatetimeLocal = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};
