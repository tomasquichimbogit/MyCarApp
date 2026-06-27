import { useMaintenanceUpdateUIHook } from "./MaintenanceUpdateUI.hook";
import { MaintenanceUpdateUIView } from "./MaintenanceUpdateUI.view";

interface MaintenanceUpdateUIProps {
  maintenanceId: number;
}

export const MaintenanceUpdateUI = ({ maintenanceId }: MaintenanceUpdateUIProps) => {
  const hook = useMaintenanceUpdateUIHook({ maintenanceId });
  return <MaintenanceUpdateUIView {...hook} />;
};
