import { useApiGetQuery, useApiPostMutation } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import { ensureSupabaseAuthSession } from "@/services/auth.service";
import type { IWorkshop } from "@/view/Workshops/list/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "tomascomponents";
import { workshopsKeys } from "./workshopsKeys";

type TWorkshopSchedule = Partial<
  Record<
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday",
    string | null
  >
>;

export interface IWorkshopRow {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  phones: string[] | null;
  emails: string[] | null;
  schedule: TWorkshopSchedule | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  cover_url: string | null;
  services: string[] | null;
  rating: number | null;
  rating_count: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface ICreateWorkshopPayload {
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  phones?: string[];
  emails?: string[];
  schedule?: TWorkshopSchedule;
  website?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  logo_url?: string;
  cover_url?: string;
  services?: string[];
  rating?: number;
  rating_count?: number;
  is_active?: boolean;
}

export interface IUpdateWorkshopPayload extends ICreateWorkshopPayload {
  id: number;
}

const toNullableString = (value?: string) => {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : null;
};

const toStringArray = (value: string[] | null | undefined): string[] =>
  Array.isArray(value) ? value.filter(Boolean) : [];

const removeUndefined = <T extends Record<string, unknown>>(payload: T) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  ) as Partial<T>;

const buildWorkshopPayload = (payload: ICreateWorkshopPayload) =>
  removeUndefined({
    name: payload.name.trim(),
    description: toNullableString(payload.description),
    address: toNullableString(payload.address),
    city: toNullableString(payload.city),
    state: toNullableString(payload.state),
    country: toNullableString(payload.country),
    latitude: payload.latitude ?? null,
    longitude: payload.longitude ?? null,
    phones: toStringArray(payload.phones),
    emails: toStringArray(payload.emails),
    schedule: payload.schedule ?? null,
    website: toNullableString(payload.website),
    facebook: toNullableString(payload.facebook),
    instagram: toNullableString(payload.instagram),
    whatsapp: toNullableString(payload.whatsapp),
    logo_url: toNullableString(payload.logo_url),
    cover_url: toNullableString(payload.cover_url),
    services: toStringArray(payload.services),
    rating: payload.rating ?? null,
    rating_count: payload.rating_count ?? 0,
    is_active: payload.is_active ?? true,
  });

const mapWorkshop = (row: IWorkshopRow): IWorkshop => ({
  id: row.id,
  name: row.name,
  description: row.description ?? undefined,
  address: row.address ?? undefined,
  city: row.city ?? undefined,
  state: row.state ?? undefined,
  country: row.country ?? undefined,
  latitude: row.latitude ?? undefined,
  longitude: row.longitude ?? undefined,
  phones: toStringArray(row.phones),
  emails: toStringArray(row.emails),
  schedule: row.schedule ?? undefined,
  website: row.website ?? undefined,
  facebook: row.facebook ?? undefined,
  instagram: row.instagram ?? undefined,
  whatsapp: row.whatsapp ?? undefined,
  logo_url: row.logo_url ?? undefined,
  cover_url: row.cover_url ?? undefined,
  services: toStringArray(row.services),
  rating: row.rating ?? undefined,
  rating_count: row.rating_count ?? undefined,
  is_active: row.is_active ?? undefined,
  created_at: row.created_at,
  updated_at: row.updated_at ?? undefined,
  deleted_at: null,
});

export const createWorkshop = async (
  payload: ICreateWorkshopPayload,
): Promise<IWorkshopRow> => {
  await ensureSupabaseAuthSession();

  const { data, error } = await SUPABASE
    .from("workshop")
    .insert(buildWorkshopPayload(payload))
    .select("*")
    .single();

  if (error) throw error;
  return data as IWorkshopRow;
};

export const fetchWorkshopById = async (
  workshopId: number,
): Promise<IWorkshopRow> => {
  await ensureSupabaseAuthSession();

  const { data, error } = await SUPABASE
    .from("workshop")
    .select("*")
    .eq("id", workshopId)
    .is("deleted_at", null)
    .single();

  if (error) throw error;
  return data as IWorkshopRow;
};

export const updateWorkshop = async (
  payload: IUpdateWorkshopPayload,
): Promise<IWorkshopRow> => {
  await ensureSupabaseAuthSession();

  const { id, ...values } = payload;
  const { data, error } = await SUPABASE
    .from("workshop")
    .update({
      ...buildWorkshopPayload(values),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select("*")
    .single();

  if (error) throw error;
  return data as IWorkshopRow;
};

export const deleteWorkshop = async (workshopId: number): Promise<void> => {
  await ensureSupabaseAuthSession();

  const { error } = await SUPABASE
    .from("workshop")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", workshopId)
    .is("deleted_at", null);

  if (error) throw error;
};

export const fetchWorkshops = async (): Promise<IWorkshop[]> => {
  const { data, error } = await SUPABASE
    .from("workshop")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as IWorkshopRow[]).map(mapWorkshop);
};

export const useCreateWorkshop = () => {
  const queryClient = useQueryClient();

  return useApiPostMutation<ICreateWorkshopPayload, IWorkshopRow>(
    true,
    createWorkshop,
    "create-workshop",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: workshopsKeys.init });
      },
    },
  );
};

export const useWorkshops = () => {
  return useApiGetQuery(workshopsKeys.list(), fetchWorkshops);
};

export const useWorkshopById = (workshopId: number, enabled = true) => {
  return useApiGetQuery(
    workshopsKeys.detail(workshopId),
    () => fetchWorkshopById(workshopId),
    { enabled: enabled && Number.isFinite(workshopId) && workshopId > 0 },
  );
};

export const useUpdateWorkshop = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  return useMutation({
    mutationKey: ["PUT", "update-workshop"],
    mutationFn: updateWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workshopsKeys.init });
    },
    onError: (error) => {
      notify("error", {
        title: error instanceof Error ? error.message : String(error),
      });
    },
  });
};

export const useDeleteWorkshop = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  return useMutation({
    mutationKey: ["DELETE", "delete-workshop"],
    mutationFn: deleteWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workshopsKeys.init });
      notify("success", {
        title: "Taller eliminado",
      });
    },
    onError: (error) => {
      notify("error", {
        title: error instanceof Error ? error.message : String(error),
      });
    },
  });
};
