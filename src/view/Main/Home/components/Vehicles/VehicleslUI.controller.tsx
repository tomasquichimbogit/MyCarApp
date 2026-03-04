import { useVehiclesUI } from "./VehicleslUI.hook";
import { VehiclesUIView } from "./VehicleslUI.view";

export const VehiclesUI = () => {
  const hook = useVehiclesUI();
  return <VehiclesUIView {...hook} />;
};