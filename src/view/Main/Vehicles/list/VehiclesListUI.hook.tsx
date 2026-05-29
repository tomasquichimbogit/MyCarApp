import { useCallback, useMemo } from "react";
import { useMyVehiclesQuery, type VehicleRecord } from "@/services/vehiculo.service";
import { useLocalStorage } from "@/store/useLocalStorage";
import { VehicleCreateUI } from "../create/VehicleCreateUI.controller";
import { useModal } from "tomascomponents";

export interface IVehiclesListUI {
  vehicles: VehicleRecord[];
  isLoadingVehicles: boolean;
  favoriteVehicles?: VehicleRecord;
  openModalEditVehicle: () => void;
}

export const useVehiclesListUI = (): IVehiclesListUI => {
  const { openModal } = useModal();
  const { favoriteVehiclesId } = useLocalStorage();
  const { data: vehicles = [], isLoading: isLoadingVehicles } = useMyVehiclesQuery();

  const favoriteVehicles = useMemo(() => {
    return vehicles.find((vehicle) => favoriteVehiclesId === vehicle.id);
  }, [favoriteVehiclesId, vehicles]);

  const filterFavoriteVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => favoriteVehiclesId !== vehicle.id);
  }, [favoriteVehiclesId, vehicles]);

  const openModalEditVehicle = useCallback(() => {
    openModal({
      title: "Agregar vehículo",
      content: <VehicleCreateUI />,
      width: "40vw",
      height: "auto",
    });
  }, [openModal]);

  return {
    vehicles: filterFavoriteVehicles,
    isLoadingVehicles,
    favoriteVehicles,
    openModalEditVehicle,
  };
};
