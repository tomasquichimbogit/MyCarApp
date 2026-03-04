import { useMemo } from "react";
import { useVehiclesQuery } from "../../../../../services/vehiculo.service";
import type { CollapseProps } from "tomascomponents";
import { VehicleItemUI } from "./components/VehicleItem/VehicleItemUI.controller";

export interface IVehiclesUI {
    itemsCollapse: CollapseProps['items'];
}

export const useVehiclesUI = (): IVehiclesUI => {
    const { data: vehicles } = useVehiclesQuery();

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
      return items;
    },[normalizedVehicles]);

  return {
    itemsCollapse,
  };
};