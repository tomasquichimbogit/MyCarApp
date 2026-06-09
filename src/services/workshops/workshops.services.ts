import { useApiGetQuery } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import { workshopsKeys } from "./workshopsKeys";
import type { IWorkshop } from "@/view/Workshops/list/interfaces";



export const fetchWorkshops = async (): Promise<IWorkshop[]> => {
  const { data, error } = await SUPABASE
    .from("workshop")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as IWorkshop[]);
};

export const useWorkshops = () => {
  return useApiGetQuery(workshopsKeys.list(), fetchWorkshops);
};
