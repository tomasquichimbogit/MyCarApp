import type { VehicleRecord } from "../../../../../../../services/vehiculo.service";
import { useVehicleItemUI } from "./VehicleItemUI.hook";
import { VehicleItemUIView } from "./VehicleItemUI.view";


export interface IVehicleItemUIProps {
  vehicle: VehicleRecord;
}

export const VehicleItemUI = ({ vehicle }: IVehicleItemUIProps) => {
  const hook = useVehicleItemUI(vehicle);
  return <VehicleItemUIView {...hook} />;
};