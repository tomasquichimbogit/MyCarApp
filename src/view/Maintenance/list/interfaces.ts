export interface IMaintenance {
  id: string;
  vehiclePlate: string;
  workshopName?: string;
  maintenanceType: string;
  description: string;
  date: string;
  mileage: number;
  cost: number;
}
