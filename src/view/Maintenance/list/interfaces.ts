export interface IMaintenance {
  id: number;
  vehiclePlate: string;
  vehicleId: number;
  workshopId: number;
  workshopName?: string;
  maintenanceType: string;
  description: string;
  date: string;
  mileage: number;
  cost: number;
}
