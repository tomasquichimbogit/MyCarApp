import type { TabsProps } from "antd";
import { VehiclesUI } from "../Vehicles/VehicleslUI.controller";
import { MaintenanceUI } from "../Maintenance/MaintenanceUI.controller";
import { WorkshopsUI } from "../Workshops/WorkshopsUI.controller";


export interface ITabPrincipalUI {
    items: TabsProps['items'];
}


export const useTabPrincipalUI = (): ITabPrincipalUI => {
  
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Vehiculos',
            children: <VehiclesUI />,
        },
        {
            key: '2',
            label: 'Mantenimiento',
            children: <MaintenanceUI />,
        },
        {
            key: '3',
            label: 'Talleres',
            children: <WorkshopsUI />,
        },
    ];
  
    return {
    items,
  };
};