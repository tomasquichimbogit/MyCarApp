import { type VehicleRecord } from "../../../../../../../services/vehiculo.service";
import { useCallback } from "react";
import { useModal } from "tomascomponents";
import { ConfirmDeleteItemUIView } from "./components/ConfirmDeleteItemUI.view";

export interface IVehicleItemUI {
  vehicle: VehicleRecord;
  openModalEditVehicle: () => void;
  openModalConfirmDeleteVehicle: () => void;
  loading?: boolean;
}

export const useVehicleItemUI = (vehicle: VehicleRecord): IVehicleItemUI => {

  const { openModal } = useModal();

  const openModalEditVehicle = useCallback(() => {
    console.log("openModalEditVehicle");
  }, []);


  const openModalConfirmDeleteVehicle = useCallback(() => {
    if (!vehicle.id) return;
    openModal({
      title: "Eliminar vehículo",
      content: <ConfirmDeleteItemUIView vehicleId={vehicle.id} />,
      height: "auto",
    });
  }, [openModal, vehicle.id]);

  return {
    vehicle,
    openModalEditVehicle,
    openModalConfirmDeleteVehicle,
  };
};