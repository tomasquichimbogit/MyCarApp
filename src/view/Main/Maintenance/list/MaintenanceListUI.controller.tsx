import { MaintenanceListUIView } from "./MaintenanceListUI.view";
import { useMaintenanceListUI } from "./MaintenanceListUI.hook";

export const MaintenanceListUI = () => {
  const hook = useMaintenanceListUI();
  return <MaintenanceListUIView {...hook} />;
};
