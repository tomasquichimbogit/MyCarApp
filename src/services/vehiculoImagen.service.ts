import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../constants";

export interface VehicleImageRecord {
    id: string;
    vehiculo_id: string;
    nombre_archivo: string;
    storage_path: string;
    public_url: string;
    tipo: string;
    es_principal: boolean;
    created_at?: string | null;
}

export type VehicleImageInsert = Omit<VehicleImageRecord, "id" | "created_at">;
export type VehicleImageUpdate = Partial<Omit<VehicleImageRecord, "id">>;

export const useVehicleImagesQuery = (vehiculoId?: string) => {
    return useQuery({
        queryKey: ["vehiculo_imagen", vehiculoId],
        enabled: Boolean(vehiculoId),
        queryFn: async () => {
            const { data, error } = await supabase
                .from("vehiculo_imagen")
                .select("*")
                .eq("vehiculo_id", vehiculoId!)
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            return data as VehicleImageRecord[];
        },
    });
};

export const useCreateVehicleImageMutation = () => {
    return useMutation({
        mutationFn: async (payload: VehicleImageInsert) => {
            const { data, error } = await supabase.from("vehiculo_imagen").insert(payload).select().single();
            if (error) {
                throw error;
            }
            return data as VehicleImageRecord;
        },
    });
};

export const useUpdateVehicleImageMutation = () => {
    return useMutation({
        mutationFn: async ({ id, values }: { id: string; values: VehicleImageUpdate }) => {
            const { data, error } = await supabase.from("vehiculo_imagen").update(values).eq("id", id).select().single();
            if (error) {
                throw error;
            }
            return data as VehicleImageRecord;
        },
    });
};

export const useDeleteVehicleImageMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("vehiculo_imagen").delete().eq("id", id);
            if (error) {
                throw error;
            }
            return id;
        },
    });
};
