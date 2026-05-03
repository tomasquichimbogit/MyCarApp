import { useCallback } from "react";
import type { VehicleRecord } from "@/services/vehiculo.service";
import { useLocalStorage } from "@/store/useLocalStorage";
import type { IVehicleItemUIProps } from "./VehicleItemUI.controller";
import { ConfirmDeleteItemUIView } from "../ConfirmDeleteItemUI.view";
import { useModal } from "tomascomponents";
import { VehicleUpdateUI } from "../../../update/VehicleUpdateUI.controller";

export interface IVehicleItemUI {
  vehicle: VehicleRecord;
  isFavorite: boolean;
  toggleFavorite: () => void;
  openModalDeleteVehicle: (vehicleId?: string) => void;
  openModalUpdateVehicle: (vehicle?: VehicleRecord) => void;
}
export const useVehicleItemUI = (props: IVehicleItemUIProps): IVehicleItemUI => {
  const { vehicle } = props;
  const { openModal } = useModal();
  const { favoriteVehiclesId, setFavoriteVehiclesId } = useLocalStorage();
  const isFavorite = favoriteVehiclesId === vehicle.id;

  const toggleFavorite = useCallback(() => {
    setFavoriteVehiclesId(isFavorite ? undefined : vehicle.id);
  }, [isFavorite, setFavoriteVehiclesId, vehicle.id]);
  
   const openModalDeleteVehicle = useCallback(
     (vehicleId?: string) => {
       if (!vehicleId) return;
       openModal({
         title: "Eliminar vehículo",
         content: <ConfirmDeleteItemUIView vehicleId={vehicleId} />,
         width: "40vw",
         height: "auto",
       });
     },
     [openModal],
   );

  const openModalUpdateVehicle = useCallback((vehicle?: VehicleRecord) => {
    if (!vehicle) return;
    openModal({
      title: "Actualizar vehículo",
      content: <VehicleUpdateUI vehicle={vehicle} />,
      width: "40vw",
      height: "auto",
    });
  }, [openModal]);

  return {
    vehicle,
    isFavorite,
    toggleFavorite,
    openModalDeleteVehicle,
    openModalUpdateVehicle,
  };
};