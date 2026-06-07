import { useApiGetQuery, useApiPostMutation } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import type { IVehicles } from "@/view/Vehicles/list/intefaces";
import { useQueryClient } from "@tanstack/react-query";
import { vehiclesKeys } from "./vehiclesKeys";

export interface ICreateVehiclePayload {
  brand: number;
  model: number;
  year: number;
  color: string;
  person_id: number;
  license_plate: string;
}

interface IBrandRelation {
  id: number;
  name?: string;
  description?: string;
}

interface IModelRelation {
  id: number;
  name?: string;
  description?: string;
}

export interface IVehicleRow {
  id: number;
  created_at: string;
  brand: number | IBrandRelation | null;
  model: number | IModelRelation | null;
  year: number | null;
  color: string | null;
  license_plate: string | null;
  person_id: number | null;
  update_at: string | null;
  delete_id: string | null;
}

const getRelationName = (
  value: number | { name?: string; description?: string } | null,
  fallback: string,
) => {
  if (!value) return fallback;
  if (typeof value === "number") return `${fallback} ${value}`;
  return value.name ?? value.description ?? fallback;
};

const mapVehicle = (row: IVehicleRow): IVehicles => ({
  id: String(row.id),
  brand: getRelationName(row.brand, "Marca"),
  model: getRelationName(row.model, "Modelo"),
  year: row.year ?? 0,
  color: row.color ?? "-",
  plate: row.license_plate ?? "Sin placa",
});

export const createVehicle = async (
  payload: ICreateVehiclePayload,
): Promise<IVehicleRow> => {
  const { data, error } = await SUPABASE
    .from("vehicle")
    .insert({
      brand: payload.brand,
      model: payload.model,
      year: payload.year,
      color: payload.color,
      person_id: payload.person_id,
      license_plate: payload.license_plate,
    })
    .select()
    .single();

  if (error) throw error;
  return data as IVehicleRow;
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useApiPostMutation<ICreateVehiclePayload, IVehicleRow>(
    true,
    createVehicle,
    "create-vehicle",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: vehiclesKeys.init });
      },
    },
  );
};

export const fetchVehicles = async (): Promise<IVehicles[]> => {
  const { data, error } = await SUPABASE
    .from("vehicle")
    .select("*, brand(*), model(*)")
    .is("delete_id", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as IVehicleRow[]).map(mapVehicle);
};

export const useVehicles = () => {
  return useApiGetQuery(vehiclesKeys.list(), fetchVehicles);
};
