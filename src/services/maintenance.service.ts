import { useMutation, useQuery } from "@tanstack/react-query";
import { SUPABASE } from "../constants";
import { MAINTENANCE_KEYS } from "./keys";
import { useApiPostMutation } from "@/config/axiosMethods";

export interface MaintenanceRecord {
  id?: string;
  vehiculo_id: string;
  taller_id: string;
  descripcion_servicio: string;
  costo: number;
  fecha_servicio: string;
}

/** Fila lista con joins a Supabase (select anidado) */
export interface MaintenanceListRow extends MaintenanceRecord {
  id: string;
  vehiculo?: { placa: string; marca: string; modelo: string } | null;
  taller?: { nombre: string } | null;
}

/** Supabase suele inferir FK embebidas como objeto o como arreglo de un elemento según cliente/tipado */
type Embed<T> = T | T[] | null | undefined;

type RawMaintenanceListRow = MaintenanceRecord & {
  id: string;
  vehiculo?: Embed<{ placa: string; marca: string; modelo: string }>;
  taller?: Embed<{ nombre: string }>;
};

function firstEmbedOrNull<T>(value: Embed<T>): T | null {
  if (value == null) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function normalizeMaintenanceListRow(row: RawMaintenanceListRow): MaintenanceListRow {
  return {
    ...row,
    vehiculo: firstEmbedOrNull(row.vehiculo),
    taller: firstEmbedOrNull(row.taller),
  };
}

export const useMaintenanceListQuery = () => {
  return useQuery({
    queryKey: MAINTENANCE_KEYS.init,
    queryFn: async () => {
      const { data, error } = await SUPABASE.from("mantenimiento")
        .select(
          `
          id,
          vehiculo_id,
          taller_id,
          descripcion_servicio,
          costo,
          fecha_servicio,
          vehiculo ( placa, marca, modelo ),
          taller ( nombre )
        `,
        )
        .order("fecha_servicio", { ascending: false });

      if (error) {
        throw error;
      }
      const rows = (data ?? []) as RawMaintenanceListRow[];
      return rows.map(normalizeMaintenanceListRow);
    },
  });
};

export const useCreateMaintenance = () => {
  return useApiPostMutation<MaintenanceRecord, MaintenanceRecord>(
    true,
    async (payload: MaintenanceRecord) => {
      const { data, error } = await SUPABASE.from("mantenimiento").insert(payload).select().single();
      if (error) {
        throw error;
      }
      return data as MaintenanceRecord;
    },
    "create-maintenance",
  );
};

export const useUpdateMaintenanceMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: MaintenanceRecord;
    }) => {
      const { data, error } = await SUPABASE.from("mantenimiento").update(values).eq("id", id).select().single();
      if (error) {
        throw error;
      }
      return data as MaintenanceRecord;
    },
  });
};

export const useDeleteMaintenance = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await SUPABASE.from("mantenimiento").delete().eq("id", id);
      if (error) {
        throw error;
      }
      return id;
    },
  });
};
