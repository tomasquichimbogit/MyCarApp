export interface IWorkshop {
  id: number;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  phones: string[];
  emails: string[];
  schedule?: ISchedule;
  website?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  logo_url?: string;
  cover_url?: string;
  services: string[];
  rating?: number;
  rating_count?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: null;
}

export type ISchedule = Partial<
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
