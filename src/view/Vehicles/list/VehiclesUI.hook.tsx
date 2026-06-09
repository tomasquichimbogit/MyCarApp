import { useVehicles } from "@/services/vehicles/vehicles.services";
import type { IVehicles } from "./intefaces";
import { useModal } from "tomascomponents";
import { VehicleCreateUIView } from "../create/VehicleCreateUI.view";

export interface IUseVehiclesUIHook {
  vehicles: IVehicles[];
  isLoading: boolean;
  isError: boolean;
  handleAddClick: () => void;
}

export const useVehiclesUIHook = (): IUseVehiclesUIHook => {
  const {openModal} = useModal();
  const { data: vehicles = [], isLoading, isError } = useVehicles();

  const handleAddClick = () => {
    openModal({
      title: "Agregar vehículo",
      content: <VehicleCreateUIView />,
      width: "500px	",
      height: "auto",
    });
  };

  return {
    vehicles,
    isLoading,
    isError,
    handleAddClick,
  };
};
