import { useApiGetQuery, useApiPostMutation } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import { ensureSupabaseAuthSession } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "tomascomponents";
import { personKeys } from "./personKeys";

export interface IPersonRow {
  id: number;
  created_at: string;
  names: string | null;
  last_names: string | null;
  phone: string | null;
  email: string | null;
  user_id: string;
}

export interface ICreatePersonPayload {
  names: string;
  last_names: string;
  phone: string;
  email: string;
}

export interface IUpdatePersonPayload {
  id: number;
  names: string;
  last_names: string;
  phone: string;
  email: string;
}

export const fetchPersonByUserId = async (
  userId: string,
): Promise<IPersonRow | null> => {
  await ensureSupabaseAuthSession();

  const { data, error } = await SUPABASE
    .from("person")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data as IPersonRow | null;
};

export const createPerson = async (
  payload: ICreatePersonPayload,
): Promise<IPersonRow> => {
  const userId = await ensureSupabaseAuthSession();

  const { data, error } = await SUPABASE
    .from("person")
    .insert({
      names: payload.names,
      last_names: payload.last_names,
      phone: payload.phone,
      email: payload.email,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data as IPersonRow;
};

export const updatePerson = async (
  payload: IUpdatePersonPayload,
): Promise<IPersonRow> => {
  await ensureSupabaseAuthSession();

  const { id, ...values } = payload;
  const { data, error } = await SUPABASE
    .from("person")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as IPersonRow;
};

export const deletePerson = async (personId: number): Promise<void> => {
  await ensureSupabaseAuthSession();

  const { error } = await SUPABASE.from("person").delete().eq("id", personId);
  if (error) throw error;
};

export const useCurrentPerson = () => {
  const userId = useAuthStore((state) => state.user?.user.id);

  return useApiGetQuery(
    personKeys.current(userId),
    () => fetchPersonByUserId(userId!),
    { enabled: !!userId },
  );
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();

  return useApiPostMutation<ICreatePersonPayload, IPersonRow>(
    true,
    createPerson,
    "create-person",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: personKeys.init });
      },
    },
  );
};

export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  return useMutation({
    mutationKey: ["PUT", "update-person"],
    mutationFn: updatePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personKeys.init });
    },
    onError: (error) => {
      notify("error", {
        title: error instanceof Error ? error.message : String(error),
      });
    },
  });
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  return useMutation({
    mutationKey: ["DELETE", "delete-person"],
    mutationFn: deletePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: personKeys.init });
    },
    onError: (error) => {
      notify("error", {
        title: error instanceof Error ? error.message : String(error),
      });
    },
  });
};
