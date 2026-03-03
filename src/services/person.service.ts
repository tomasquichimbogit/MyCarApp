import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../constants";

export interface PersonRecord {
    id: number;
    name: string;
    lastnames: string;
    identification: string;
    user_id: string;
    fkperson_user?: string | null;
    created_at?: string | null;
}

export type PersonInsert = Omit<PersonRecord, "id" | "created_at">;
export type PersonUpdate = Partial<Omit<PersonRecord, "id">>;

export const usePersonsQuery = () => {
    return useQuery({
        queryKey: ["persona"],
        queryFn: async () => {
            const { data, error } = await supabase.from("persona").select("*").order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            return data as PersonRecord[];
        },
    });
};

export const usePersonByUserIdQuery = (userId?: string) => {
    return useQuery({
        queryKey: ["persona", "user", userId],
        enabled: Boolean(userId),
        queryFn: async () => {
            const { data, error } = await supabase.from("persona").select("*").eq("user_id", userId!).single();
            if (error) {
                throw error;
            }
            return (data ?? null) as PersonRecord | null;
        },
    });
};

export const useCreatePersonMutation = () => {
    return useMutation({
        mutationFn: async (payload: PersonInsert) => {
            const { data, error } = await supabase.from("persona").insert(payload).select().single();
            if (error) {
                throw error;
            }
            return data as PersonRecord;
        },
    });
};

export const useUpdatePersonMutation = () => {
    return useMutation({
        mutationFn: async ({ id, values }: { id: number; values: PersonUpdate }) => {
            const { data, error } = await supabase.from("persona").update(values).eq("id", id).select().single();
            if (error) {
                throw error;
            }
            return data as PersonRecord;
        },
    });
};

export const useDeletePersonMutation = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase.from("persona").delete().eq("id", id);
            if (error) {
                throw error;
            }
            return id;
        },
    });
};
