import { useApiGetQuery } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { personKeys } from "./personKeys";

export interface IPersonRow {
  id: number;
  user_id: string;
}

export const fetchPersonByUserId = async (userId: string): Promise<IPersonRow> => {
  const { data, error } = await SUPABASE
    .from("person")
    .select("id, user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("No se encontró el perfil del usuario");

  return data as IPersonRow;
};

export const useCurrentPerson = () => {
  const userId = useAuthStore((state) => state.user?.user.id);

  return useApiGetQuery(
    personKeys.current(userId),
    () => fetchPersonByUserId(userId!),
    { enabled: !!userId },
  );
};
