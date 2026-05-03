import type { MaintenanceListRow } from "@/services/maintenance.service";
import { MaintenanceItemUIView } from "./MaintenanceItemUI.view";
import { useMaintenanceItemUI } from "./MaintenanceItemUI.hook";

export interface IMaintenanceItemUIProps {
  maintenance: MaintenanceListRow;
}

export const MaintenanceItemUI = (props: IMaintenanceItemUIProps) => {
  const hook = useMaintenanceItemUI(props);
  return <MaintenanceItemUIView {...hook} />;
};
