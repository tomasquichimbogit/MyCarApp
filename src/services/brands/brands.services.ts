import { useApiGetQuery } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import { brandsKeys } from "./brandsKeys";

export interface IBrandRow {
  id: number;
  name: string;
  created_at: string;
}

export const fetchBrands = async (): Promise<IBrandRow[]> => {
  const { data, error } = await SUPABASE
    .from("brand")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data as IBrandRow[];
};

export const useBrands = () => {
  return useApiGetQuery(brandsKeys.list(), fetchBrands);
};
