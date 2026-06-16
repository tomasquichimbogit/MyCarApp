import { useVehicles } from "@/services/vehicles/vehicles.services";
import type { IVehicles } from "./intefaces";
import { useModal } from "tomascomponents";
import { VehicleCreateUIView } from "../create/VehicleCreateUI.view";
import { useMemo, useState } from "react";

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

  const handleAddClick = () => {
    openModal({
      title: "Agregar vehículo",
      content: <VehicleCreateUIView />,
      width: "500px	",
      height: "auto",
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
    handleAddClick,
    search,
    handleSearchChange,
  };
};
