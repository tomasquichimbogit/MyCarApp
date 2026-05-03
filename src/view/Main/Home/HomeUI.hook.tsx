import { useMemo } from "react";
import { VehiclesListUI } from "../Vehicles/list/VehiclesListUI.controller";
import type { TabsProps } from "antd";
import { MaintenanceListUI } from "../Maintenance/list/MaintenanceListUI.controller";
import { WorkhopsListUI } from "../Workshops/list/WorkhopsList.controller";

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
            {
                key: "3",
                label: "Talleres",
                children: <WorkhopsListUI />,
            },
        ];
    }, []);

    return {
        itemsTabs,
    }
}