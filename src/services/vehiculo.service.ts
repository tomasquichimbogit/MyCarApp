import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../constants";

export interface VehicleRecord {
    id: string;
    placa: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    propietario_id: string;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
}

export type VehicleInsert = Omit<VehicleRecord, "id" | "created_at" | "updated_at" | "deleted_at">;
export type VehicleUpdate = Partial<Omit<VehicleRecord, "id">>;

export const useVehiclesQuery = (filters?: { propietarioId?: string; includeDeleted?: boolean }) => {
    return useQuery({
        queryKey: ["vehiculo", filters],
        queryFn: async () => {
            let query = supabase.from("vehiculo").select("*").order("created_at", { ascending: false });

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
            const { data, error } = await supabase.from("vehiculo").select("*").eq("id", id!).single();
            if (error) {
                throw error;
            }
            return data as VehicleRecord;
        },
    });
};

export const useCreateVehicleMutation = () => {
    return useMutation({
        mutationFn: async (payload: VehicleInsert) => {
            const { data, error } = await supabase.from("vehiculo").insert(payload).select().single();
            if (error) {
                throw error;
            }
            return data as VehicleRecord;
        },
    });
};

export const useUpdateVehicleMutation = () => {
    return useMutation({
        mutationFn: async ({ id, values }: { id: string; values: VehicleUpdate }) => {
            const { data, error } = await supabase.from("vehiculo").update(values).eq("id", id).select().single();
            if (error) {
                throw error;
            }
            return data as VehicleRecord;
        },
    });
};

export const useDeleteVehicleMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("vehiculo").delete().eq("id", id);
            if (error) {
                throw error;
            }
            return id;
        },
    });
};
