import { useCallback, useMemo } from "react";
import { useVehiclesQuery, type VehicleRecord } from "@/services/vehiculo.service";
import { useModal, type CollapseProps, Button } from "tomascomponents";
import { VehicleItemUI } from "./components/VehicleItem/VehicleItemUI.controller";
import { VehicleCreateUI } from "./components/create/VehicleCreateUI.controller.tsx";
import { StarIcon } from "lucide-react";
export interface IVehiclesUI {
  itemsCollapse: CollapseProps["items"];
  openModalAddVehicle: () => void;
  loading?: boolean;
}

export const useVehiclesUI = (): IVehiclesUI => {
  const { data: vehicles, isLoading: isLoadingVehicles } = useVehiclesQuery();
  const { openModal } = useModal();

  const normalizedVehicles = useMemo(() => {
    return vehicles ?? [];
  }, [vehicles]);

  const renderVehicleLabel = useCallback((vehicle: VehicleRecord) => {
    return (
      <div className="flex w-full justify-between items-center">
        <span>{vehicle.marca}</span>
        <Button
          variant="outlined"
          color="primary"
          title={<div className="flex items-center gap-2"><StarIcon className="w-4 h-4" /> <small>Favorito</small></div>}
          onClick={() => {}}
        />
      </div>
    );
  }, []);

  const itemsCollapse = useMemo(() => {
    const items: CollapseProps["items"] = [];
    normalizedVehicles.forEach((vehicle) => {
      items.push({
        key: vehicle.id,
        label: renderVehicleLabel(vehicle),
        children: <VehicleItemUI vehicle={vehicle} />,
      });
    });
    return items as CollapseProps["items"];
  }, [normalizedVehicles, renderVehicleLabel]);

  const openModalAddVehicle = useCallback(() => {
    openModal({
      title: "Agregar vehículo",
      content: <VehicleCreateUI />,
      width: "40vw",
      height: "auto",
    });
  }, [openModal]);

  return {
    itemsCollapse,
    openModalAddVehicle,
    loading: isLoadingVehicles,
  };
};
