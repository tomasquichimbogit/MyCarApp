import { MaintenanceCreateUIView } from "./MaintenanceCreateUI.view"
import { useMaintenanceCreateUIHook } from "./MaintenanceCreateUI.hook"

export const MaintenanceCreateUI = () => {
    const hook = useMaintenanceCreateUIHook()
    return (
        <MaintenanceCreateUIView { ...hook } />
    )
}