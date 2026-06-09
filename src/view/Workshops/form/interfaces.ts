export interface IWorkshop {
  id: string;
  name: string;
  description?: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  phones: string[];
  emails: string[];
  schedule?: Record<string, unknown>;
  website?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  logoUrl?: string;
  coverUrl?: string;
  services: string[];
  rating: number;
  ratingCount: number;
  isActive: boolean;
}