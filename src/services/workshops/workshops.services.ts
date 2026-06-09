import { useApiGetQuery } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import type { IWorkshop } from "@/view/Workshops/form/interfaces";
import { workshopsKeys } from "./workshopsKeys";

export interface IWorkshopRow {
  id: number;
  name: string;
  description: string | null;
  address: string;
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  phones: string[] | null;
  emails: string[] | null;
  schedule: Record<string, unknown> | null;
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

const mapWorkshop = (row: IWorkshopRow): IWorkshop => ({
  id: String(row.id),
  name: row.name,
  description: row.description ?? undefined,
  address: row.address,
  city: row.city ?? undefined,
  state: row.state ?? undefined,
  country: row.country ?? undefined,
  latitude: row.latitude ?? undefined,
  longitude: row.longitude ?? undefined,
  phones: row.phones ?? [],
  emails: row.emails ?? [],
  schedule: row.schedule ?? undefined,
  website: row.website ?? undefined,
  facebook: row.facebook ?? undefined,
  instagram: row.instagram ?? undefined,
  whatsapp: row.whatsapp ?? undefined,
  logoUrl: row.logo_url ?? undefined,
  coverUrl: row.cover_url ?? undefined,
  services: row.services ?? [],
  rating: row.rating ?? 0,
  ratingCount: row.rating_count ?? 0,
  isActive: row.is_active ?? true,
});

export const fetchWorkshops = async (): Promise<IWorkshop[]> => {
  const { data, error } = await SUPABASE
    .from("workshop")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as IWorkshopRow[]).map(mapWorkshop);
};

export const useWorkshops = () => {
  return useApiGetQuery(workshopsKeys.list(), fetchWorkshops);
};
