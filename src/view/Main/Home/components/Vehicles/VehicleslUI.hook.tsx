import { useCallback, useMemo } from "react";
import { useVehiclesQuery } from "../../../../../services/vehiculo.service";
import { useModal, type CollapseProps } from "tomascomponents";
import { VehicleItemUI } from "./components/VehicleItem/VehicleItemUI.controller";
import { VehicleCreateUI } from "./components/create/VehicleCreateUI.controller.tsx";
export interface IVehiclesUI {
  itemsCollapse: CollapseProps['items'];
  openModalAddVehicle: () => void;
  loading?: boolean;
}

export const useVehiclesUI = (): IVehiclesUI => {
  const { data: vehicles, isLoading: isLoadingVehicles } = useVehiclesQuery();
  const { openModal } = useModal();

  const normalizedVehicles = useMemo(() => {
    return vehicles ?? [];
  }, [vehicles]);

  const itemsCollapse = useMemo(() => {
    const items: CollapseProps['items'] = [];
    normalizedVehicles.forEach((vehicle) => {
      items.push({
        key: vehicle.id,
        label: vehicle.marca,
        children: <VehicleItemUI vehicle={vehicle} />,
      });
    });
    return items as CollapseProps['items'];
  }, [normalizedVehicles]);

  const openModalAddVehicle = useCallback(() => {
    openModal({
      title: "Agregar vehículo",
      content: <VehicleCreateUI />,
      width: "40vw",
      height: "auto",
    });
  }, []);

  return {
    itemsCollapse,
    openModalAddVehicle,
    loading: isLoadingVehicles,
  };
};