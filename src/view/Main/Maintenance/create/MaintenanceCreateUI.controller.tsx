import { MaintenanceCreateUIView } from "./MaintenanceCreateUI.view";
import { useMaintenanceCreateUI } from "./MaintenanceCreateUI.hook";

export const MaintenanceCreateUI = () => {
  const hook = useMaintenanceCreateUI();
  return <MaintenanceCreateUIView {...hook} />;
};
