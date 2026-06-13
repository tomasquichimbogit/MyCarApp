import { MaintenanceUIView } from "./MaintenanceUI.view"
import { useMaintenanceUIHook } from "./MaintenanceUI.hook"

export const MaintenanceUI = () => {
    const hook = useMaintenanceUIHook()
    return <MaintenanceUIView { ...hook } />
}
