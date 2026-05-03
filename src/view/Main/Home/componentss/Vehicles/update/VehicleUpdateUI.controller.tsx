import { VehicleUpdateUIView } from "./VehicleUpdateUI.view";
import { useVehicleUpdateUI } from "./VehicleUpdateUI.hook";
import type { VehicleRecord } from "@/services/vehiculo.service";

export interface IVehicleUpdateUIProps {
  vehicle: VehicleRecord;
}

export const VehicleUpdateUI = (props: IVehicleUpdateUIProps) => {
  const hook = useVehicleUpdateUI(props);
  return <VehicleUpdateUIView {...hook} />;
};