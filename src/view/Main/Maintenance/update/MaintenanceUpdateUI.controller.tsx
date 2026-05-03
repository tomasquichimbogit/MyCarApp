import type { MaintenanceListRow } from "@/services/maintenance.service";
import { MaintenanceUpdateUIView } from "./MaintenanceUpdateUI.view";
import { useMaintenanceUpdateUI } from "./MaintenanceUpdateUI.hook";

export interface IMaintenanceUpdateUIProps {
  maintenance: MaintenanceListRow;
}

export const MaintenanceUpdateUI = (props: IMaintenanceUpdateUIProps) => {
  const hook = useMaintenanceUpdateUI(props);
  return <MaintenanceUpdateUIView {...hook} />;
};
