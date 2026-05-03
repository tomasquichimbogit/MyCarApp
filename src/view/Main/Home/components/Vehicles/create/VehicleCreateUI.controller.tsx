import { VehicleCreateUIView } from "./VehicleCreateUI.view"
import { useVehicleCreateUI } from "./VehicleCreateUI.hook";

export const VehicleCreateUI = () => {  
    const hook = useVehicleCreateUI();
    return (
        <VehicleCreateUIView {...hook} />
    )
}