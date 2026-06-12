import { useApiGetQuery, useApiPostMutation } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import { ensureSupabaseAuthSession } from "@/services/auth.service";
import type { IVehicles } from "@/view/Vehicles/list/intefaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "tomascomponents";
import { vehiclesKeys } from "./vehiclesKeys";

export interface ICreateVehiclePayload {
  brand: number;
  model: number;
  year: number;
  color: string;
  person_id: number;
  license_plate: string;
}

export interface IUpdateVehiclePayload extends ICreateVehiclePayload {
  id: number;
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

export interface IVehicleDetailRow {
  id: number;
  created_at: string;
  brand: number;
  model: number;
  year: number;
  color: string;
  license_plate: string;
  person_id: number;
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
  await ensureSupabaseAuthSession();

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

export const fetchVehicleById = async (vehicleId: number): Promise<IVehicleDetailRow> => {
  await ensureSupabaseAuthSession();

  const { data, error } = await SUPABASE
    .from("vehicle")
    .select("*")
    .eq("id", vehicleId)
    .is("delete_id", null)
    .single();

  if (error) throw error;
  return data as IVehicleDetailRow;
};

export const updateVehicle = async (payload: IUpdateVehiclePayload): Promise<IVehicleDetailRow> => {
  await ensureSupabaseAuthSession();

  const { id, ...values } = payload;
  const { data, error } = await SUPABASE
    .from("vehicle")
    .update({
      ...values,
      license_plate: values.license_plate.trim().toUpperCase(),
      update_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("delete_id", null)
    .select("*")
    .single();

  if (error) throw error;
  return data as IVehicleDetailRow;
};

export const deleteVehicle = async (vehicleId: number): Promise<void> => {
  await ensureSupabaseAuthSession();
  const { error } = await SUPABASE
    .from("vehicle")
    .update({
      delete_id: new Date().toISOString(),
      update_at: new Date().toISOString(),
    })
    .eq("id", vehicleId)
    .is("delete_id", null);

  if (error) throw error;
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

export const useVehicleById = (vehicleId: number, enabled = true) => {
  return useApiGetQuery(
    [...vehiclesKeys.list(), "detail", vehicleId],
    () => fetchVehicleById(vehicleId),
    { enabled: enabled && Number.isFinite(vehicleId) && vehicleId > 0 },
  );
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  return useMutation({
    mutationKey: ["PUT", "update-vehicle"],
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.init });
    },
    onError: (error) => {
      notify("error", {
        title: error instanceof Error ? error.message : String(error),
      });
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  return useMutation({
    mutationKey: ["DELETE", "delete-vehicle"],
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehiclesKeys.init });
      notify("success", {
        title: "Vehículo eliminado",
      });
    },
    onError: (error) => {
      notify("error", {
        title: error instanceof Error ? error.message : String(error),
      });
    },
  });
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
