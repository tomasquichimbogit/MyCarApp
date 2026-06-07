import { useApiGetQuery } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { modelsKeys } from "./modelsKeys";

export interface IModelRow {
  id: number;
  brand_id: number;
  name: string;
}

type UseModelsOptions = Omit<
  UseQueryOptions<IModelRow[], Error, IModelRow[], QueryKey>,
  "queryKey" | "queryFn"
>;

const getValidBrandId = (brandId?: number) =>
  brandId !== undefined && brandId > 0 ? brandId : undefined;

export const fetchModels = async (brandId?: number): Promise<IModelRow[]> => {
  const validBrandId = getValidBrandId(brandId);
  let query = SUPABASE
    .from("model")
    .select("*")
    .order("name", { ascending: true });

  if (validBrandId !== undefined) {
    query = query.eq("brand_id", validBrandId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as IModelRow[];
};

export const useModels = (brandId?: number, options?: UseModelsOptions) => {
  const validBrandId = getValidBrandId(brandId);
  return useApiGetQuery<IModelRow[]>(
    modelsKeys.list(validBrandId),
    () => fetchModels(validBrandId),
    options,
  );
};
