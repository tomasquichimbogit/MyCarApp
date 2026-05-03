import { useMutation, useQuery } from "@tanstack/react-query";
import { SUPABASE } from "../constants";
import { WORKSHOP_KEYS } from "./keys";
import { useApiPostMutation } from "@/config/axiosMethods";

export interface WorkshopRecord {
  id?: string;
  nombre: string;
  direccion: string;
  telefono: string;
  especialidad: string;
  created_at?: string | null;
}

export const useWorkshopsQuery = () => {
  return useQuery({
    queryKey: WORKSHOP_KEYS.init,
    queryFn: async () => {
      const { data, error } = await SUPABASE.from("taller")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data as WorkshopRecord[];
    },
  });
};

export const useCreateWorkshop = () => {
  return useApiPostMutation<WorkshopRecord, WorkshopRecord>(
    true,
    async (payload: WorkshopRecord) => {
      const { data, error } = await SUPABASE.from("taller")
        .insert(payload)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as WorkshopRecord;
    },
    "create-workshop",
  );
};

export const useUpdateWorkshopMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: WorkshopRecord;
    }) => {
      const { data, error } = await SUPABASE.from("taller")
        .update(values)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as WorkshopRecord;
    },
  });
};

export const useDeleteWorkshop = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await SUPABASE.from("taller").delete().eq("id", id);

      if (error) {
        throw error;
      }

      return id;
    },
  });
};
