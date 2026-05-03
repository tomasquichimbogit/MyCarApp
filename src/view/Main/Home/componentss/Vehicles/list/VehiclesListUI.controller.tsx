import { VehiclesListUIView } from "./VehiclesListUI.view";
import { useVehiclesListUI } from "./VehiclesListUI.hook";

export const VehiclesListUI = () => {
  const hook = useVehiclesListUI();
  return <VehiclesListUIView {...hook} />;
};