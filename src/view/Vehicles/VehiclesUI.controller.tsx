import { VehiclesUIView } from "./VehiclesUI.view"
import { useVehiclesUIHook } from "./VehiclesUI.hook"

export const VehiclesUI = () => {
    const hook = useVehiclesUIHook()
    return <VehiclesUIView { ...hook } />
}