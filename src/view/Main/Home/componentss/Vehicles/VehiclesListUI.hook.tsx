import { useVehiclesQuery, type VehicleRecord } from "../../../../../services/vehiculo.service";


export interface IVehiclesListUI {
  vehicles: VehicleRecord[];
  isLoadingVehicles: boolean;
}

export const useVehiclesListUI = (): IVehiclesListUI => {
  const { data: vehicles=[], isLoading: isLoadingVehicles } = useVehiclesQuery();

  return {
    vehicles,
    isLoadingVehicles,
  };
};