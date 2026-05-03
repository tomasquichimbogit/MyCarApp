import { MaintenanceFormUIView } from "./MaintenanceFormUI.view";
import { useMaintenanceFormUI, type IMaintenanceFormUIProps } from "./MaintenanceFormUI.hook";

export const MaintenanceFormUI = (props: IMaintenanceFormUIProps) => {
  const hook = useMaintenanceFormUI(props);
  return <MaintenanceFormUIView {...hook} />;
};
