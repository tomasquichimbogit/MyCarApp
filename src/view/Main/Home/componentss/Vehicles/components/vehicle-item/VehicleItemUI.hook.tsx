import { useCallback, useMemo } from "react";
import type { VehicleRecord } from "../../../../../../../services/vehiculo.service";
import type { IVehicleItemUIProps } from "./VehicleItemUI.controller";
import { useLocalStorage } from "../../../../../../../store/useLocalStorage";

export interface IVehicleItemUI {
  vehicle: VehicleRecord;
  isFavorite: boolean;
  toggleFavorite: () => void;
}
export const useVehicleItemUI = (props: IVehicleItemUIProps): IVehicleItemUI => {
  const { vehicle } = props; 
  const { favoriteVehiclesId, setFavoriteVehiclesId } = useLocalStorage();

  const toggleFavorite = useCallback(() => {
    setFavoriteVehiclesId(isFavorite ? undefined : vehicle.id);
  }, [favoriteVehiclesId, vehicle.id]);

  const isFavorite = useMemo(() => {
    return favoriteVehiclesId === vehicle.id;
  }, [favoriteVehiclesId, vehicle.id]);

  return {
    vehicle,
    isFavorite,
    toggleFavorite,
  };
};