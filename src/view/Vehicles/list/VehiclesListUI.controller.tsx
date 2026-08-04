import { useVehiclesListUIHook } from "./VehiclesListUI.hook";
import { VehiclesListUIView } from "./VehiclesListUI.view";

export const VehiclesListUI = () => {
    const hook = useVehiclesListUIHook();
    return <VehiclesListUIView {...hook} />;
};