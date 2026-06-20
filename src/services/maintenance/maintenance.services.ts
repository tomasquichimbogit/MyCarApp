import { useApiGetQuery, useApiPostMutation } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import { ensureSupabaseAuthSession } from "@/services/auth.service";
import type { IMaintenance } from "@/view/Maintenance/list/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "tomascomponents";
import { maintenanceKeys } from "./maintenanceKeys";

interface IVehicleRelation {
  id: number;
  license_plate?: string | null;
}

interface IWorkshopRelation {
  id: number;
  name?: string | null;
}

export interface IMaintenanceRow {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  vehicle_id: number | IVehicleRelation | null;
  workshop_id: number | IWorkshopRelation | null;
  vehicle?: IVehicleRelation | null;
  workshop?: IWorkshopRelation | null;
  maintenance_type: string | null;
  description: string | null;
  mileage: number | null;
  cost: number | null;
  maintenance_date: string | null;
}

export interface IMaintenanceDetailRow {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  vehicle_id: number;
  workshop_id: number | null;
  maintenance_type: string;
  description: string | null;
  mileage: number | null;
  cost: number | null;
  maintenance_date: string;
}

export interface ICreateMaintenancePayload {
  vehicle_id: number;
  workshop_id?: number | null;
  maintenance_type: string;
  description?: string;
  mileage?: number;
  cost?: number;
  maintenance_date: string;
}

export interface IUpdateMaintenancePayload extends ICreateMaintenancePayload {
  id: number;
}

const toNullableString = (value?: string) => {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : null;
};

const getVehiclePlate = (
  value: number | IVehicleRelation | null,
): string => {
  if (!value) return "Sin vehículo";
  if (typeof value === "number") return `Vehículo ${value}`;
  return value.license_plate ?? `Vehículo ${value.id}`;
};

const getWorkshopName = (
  value: number | IWorkshopRelation | null,
): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "number") return `Taller ${value}`;
  return value.name ?? `Taller ${value.id}`;
};

const getWorkshopId = (
  value: number | IWorkshopRelation | null,
): number => {
  if (!value) return 0;
  if (typeof value === "number") return value;
  return value.id;
};

const buildMaintenancePayload = (payload: ICreateMaintenancePayload) => ({
  vehicle_id: payload.vehicle_id,
  workshop_id: payload.workshop_id ?? null,
  maintenance_type: payload.maintenance_type.trim(),
  description: toNullableString(payload.description),
  mileage: payload.mileage ?? null,
  cost: payload.cost ?? null,
  maintenance_date: payload.maintenance_date,
});

const mapMaintenance = (row: IMaintenanceRow): IMaintenance => ({
  id: row.id,
  vehiclePlate: getVehiclePlate(row.vehicle ?? row.vehicle_id),
  vehicleId: row.vehicle?.id ?? 0,
  workshopId: getWorkshopId(row.workshop ?? row.workshop_id),
  workshopName: getWorkshopName(row.workshop ?? row.workshop_id),
  maintenanceType: row.maintenance_type ?? "Mantenimiento",
  description: row.description ?? "-",
  date: row.maintenance_date ?? row.created_at,
  mileage: row.mileage ?? 0,
  cost: row.cost ?? 0,
});

export const createMaintenance = async (
  payload: ICreateMaintenancePayload,
): Promise<IMaintenanceDetailRow> => {
  await ensureSupabaseAuthSession();

  const { data, error } = await SUPABASE
    .from("maintenance")
    .insert(buildMaintenancePayload(payload))
    .select("*")
    .single();

  if (error) throw error;
  return data as IMaintenanceDetailRow;
};

export const fetchMaintenanceById = async (
  maintenanceId: number,
): Promise<IMaintenanceDetailRow> => {
  await ensureSupabaseAuthSession();

  const { data, error } = await SUPABASE
    .from("maintenance")
    .select("*")
    .eq("id", maintenanceId)
    .is("deleted_at", null)
    .single();

  if (error) throw error;
  return data as IMaintenanceDetailRow;
};

export const updateMaintenance = async (
  payload: IUpdateMaintenancePayload,
): Promise<IMaintenanceDetailRow> => {
  await ensureSupabaseAuthSession();

  const { id, ...values } = payload;
  const { data, error } = await SUPABASE
    .from("maintenance")
    .update({
      ...buildMaintenancePayload(values),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select("*")
    .single();

  if (error) throw error;
  return data as IMaintenanceDetailRow;
};

export const deleteMaintenance = async (
  maintenanceId: number,
): Promise<void> => {
  await ensureSupabaseAuthSession();

  const { error } = await SUPABASE
    .from("maintenance")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", maintenanceId)
    .is("deleted_at", null);

  if (error) throw error;
};

export const fetchMaintenances = async (): Promise<IMaintenance[]> => {
  const { data, error } = await SUPABASE
    .from("maintenance")
    .select("*, vehicle(*), workshop(*)")
    .is("deleted_at", null)
    .order("maintenance_date", { ascending: false });

  if (error) throw error;
  return (data as IMaintenanceRow[]).map(mapMaintenance);
};

export const fetchMaintenancesByVehicleId = async (
  vehicleId: number,
): Promise<IMaintenance[]> => {
  const { data, error } = await SUPABASE
    .from("maintenance")
    .select("*, vehicle(id, license_plate), workshop(id, name)")
    .eq("vehicle_id", vehicleId)
    .is("deleted_at", null)
    .order("maintenance_date", { ascending: false });

  if (error) throw error;
  return (data as IMaintenanceRow[]).map(mapMaintenance);
};

export const useCreateMaintenance = () => {
  const queryClient = useQueryClient();

  return useApiPostMutation<ICreateMaintenancePayload, IMaintenanceDetailRow>(
    true,
    createMaintenance,
    "create-maintenance",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: maintenanceKeys.init });
      },
    },
  );
};

export const useMaintenances = () => {
  return useApiGetQuery(maintenanceKeys.list(), fetchMaintenances);
};

export const useMaintenanceById = (maintenanceId: number, enabled = true) => {
  return useApiGetQuery(
    maintenanceKeys.detail(maintenanceId),
    () => fetchMaintenanceById(maintenanceId),
    { enabled: enabled && Number.isFinite(maintenanceId) && maintenanceId > 0 },
  );
};

export const useMaintenancesByVehicleId = (
  vehicleId?: number,
  enabled = true,
) => {
  const isValidVehicleId =
    Number.isFinite(vehicleId) && (vehicleId ?? 0) > 0;

  return useApiGetQuery(
    maintenanceKeys.listByVehicleId(vehicleId ?? 0),
    () => fetchMaintenancesByVehicleId(vehicleId as number),
    { enabled: enabled && isValidVehicleId },
  );
};

export const useUpdateMaintenance = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  return useMutation({
    mutationKey: ["PUT", "update-maintenance"],
    mutationFn: updateMaintenance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.init });
    },
    onError: (error) => {
      notify("error", {
        title: error instanceof Error ? error.message : String(error),
      });
    },
  });
};

export const useDeleteMaintenance = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  return useMutation({
    mutationKey: ["DELETE", "delete-maintenance"],
    mutationFn: deleteMaintenance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.init });
      notify("success", {
        title: "Mantenimiento eliminado",
      });
    },
    onError: (error) => {
      notify("error", {
        title: error instanceof Error ? error.message : String(error),
      });
    },
  });
};
