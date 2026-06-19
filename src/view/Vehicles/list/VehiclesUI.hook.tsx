import { useVehicles } from "@/services/vehicles/vehicles.services";
import type { IVehicles } from "./intefaces";
import { useModal } from "tomascomponents";
import { VehicleCreateUIView } from "../create/VehicleCreateUI.view";
import { useMemo, useState } from "react";
import { TypeVehicleUI } from "./components/TypeVehicleUI.view";
import { ETypeVehicle } from "@/enums";

export interface IUseVehiclesUIHook {
  vehicles: IVehicles[];
  isLoading: boolean;
  isError: boolean;
  handleAddClick: () => void;
  search?: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useVehiclesUIHook = (): IUseVehiclesUIHook => {
  const { openModal } = useModal();
  const [search, setSearch] = useState<string>();
  const { data: vehicles = [], isLoading, isError } = useVehicles();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOpenModalTypeVehicle = (type: ETypeVehicle) => {
    const title = type === ETypeVehicle.MOTORCYCLE ? "Agregar motocicleta" : "Agregar vehículo";

    openModal({
      title,
      content: <VehicleCreateUIView vehicleType={type} />,
      width: "500px	",
      height: "auto",
    });
  };

  const openModalConfirmTypeVehicle = () => {
    openModal({
      title: "Selecciona el tipo de vehículo",
      content: <TypeVehicleUI openModal={handleOpenModalTypeVehicle} />,
      width: "500px",
      height: "100px",
    });
  };

  const filteredVehicles = useMemo(() => {
    if (!search) return vehicles;
    const normalizedSearch = search.trim().toLowerCase();
    return vehicles.filter(
      (vehicle) =>
        vehicle.brand?.toLowerCase().includes(normalizedSearch) ||
        vehicle.model?.toLowerCase().includes(normalizedSearch) ||
        vehicle.year?.toString().includes(normalizedSearch) ||
        vehicle.color?.toLowerCase().includes(normalizedSearch) ||
        vehicle.plate?.toLowerCase().includes(normalizedSearch),
    );
  }, [vehicles, search]);

  return {
    vehicles: filteredVehicles,
    isLoading,
    isError,
    handleAddClick: openModalConfirmTypeVehicle,
    search,
    handleSearchChange,
  };
};
