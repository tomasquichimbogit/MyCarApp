import { useMutation, useQuery } from "@tanstack/react-query";
import { SUPABASE } from "../constants";
import { VEHICLE_KEYS } from "./keys";
import { useApiPostMutation } from "@/config/axiosMethods";

export interface VehicleRecord {
    id?: string;
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    propietario_id: number;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
}

export interface UseVehiclesQueryProps {
    propietarioId?: string;
    includeDeleted?: boolean;
}
export const useVehiclesQuery = (filters?: UseVehiclesQueryProps) => {
    return useQuery({
        queryKey: VEHICLE_KEYS.listFilters(filters ?? {}),
        queryFn: async () => {
            let query = SUPABASE.from("vehiculo").select("*").order("created_at", { ascending: false });

            if (filters?.propietarioId) {
                query = query.eq("propietario_id", filters.propietarioId);
            }

            if (!filters?.includeDeleted) {
                query = query.is("deleted_at", null);
            }

            const { data, error } = await query;
            if (error) {
                throw error;
            }
            return data as VehicleRecord[];
        },
    });
};

export const useVehicleQuery = (id?: string) => {
    return useQuery({
        queryKey: ["vehiculo", id],
        enabled: Boolean(id),
        queryFn: async () => {
            const { data, error } = await SUPABASE.from("vehiculo").select("*").eq("id", id!).single();
            if (error) {
                throw error;
            }
            return data as VehicleRecord;
        },
    });
};

export const useCreateVehicle = () => {
    return useApiPostMutation<VehicleRecord, VehicleRecord>(
      true,
      async (payload: VehicleRecord) => {
        const { data, error } = await SUPABASE.from("vehiculo").insert(payload).select().single();
        if (error) {
          throw error;
        }
        return data as VehicleRecord;
      },
      "create-vehicle",
    );
};

export const useUpdateVehicleMutation = () => {
    return useMutation({
      mutationFn: async ({ id, values }: { id: string; values: VehicleRecord }) => {
        const { data, error } = await SUPABASE.from("vehiculo").update(values).eq("id", id).select().single();
        if (error) {
          throw error;
        }
        return data as VehicleRecord;
      },
    });
};

export const useDeleteVehicle = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await SUPABASE.from("vehiculo").delete().eq("id", id);
            if (error) {
                throw error;
            }
            return id;
        },
    });
};
