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
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
}

export interface ISchedule {
  friday: string;
  monday: string;
  sunday: null;
  tuesday: string;
  saturday: string;
  thursday: string;
  wednesday: string;
}
