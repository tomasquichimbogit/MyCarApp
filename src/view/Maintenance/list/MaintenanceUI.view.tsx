import { CentralContainerUI } from "@/components/Render/CentralContainerUI"
import type { IUseMaintenanceUIHook } from "./MaintenanceUI.hook"

export const MaintenanceUIView = ({ handleAddNewMaintenance }: IUseMaintenanceUIHook) => {
    return (
      <CentralContainerUI title="Mantenimientos" onAddClick={handleAddNewMaintenance} addButtonTitle="Nuevo">
        Test
      </CentralContainerUI>
    );
}
