import { useMemo } from "react";
import { VehiclesListUI } from "./componentss/Vehicles/list/VehiclesListUI.controller";
import type { TabsProps } from "antd";
import { MaintenanceListUI } from "./componentss/Maintenance/list/MaintenanceListUI.controller";

export interface IUseHomeUI {
    itemsTabs: TabsProps['items'];
}

export const useHomeUI = (): IUseHomeUI => {
  
    const itemsTabs = useMemo(() => {
        return [
            {
                key: "1",
                label: "Vehículos",
                children: <VehiclesListUI />,
            },
            {
                key: "2",
                label: "Mantenimientos",
                children: <MaintenanceListUI />,
            },
        ];
    }, []);

    return {
        itemsTabs,
    }
}