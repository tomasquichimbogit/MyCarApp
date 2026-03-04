
import type { VehicleRecord } from "../../../../../../../services/vehiculo.service";

export interface IVehicleItemUI {
  vehicle: VehicleRecord;
}

export const useVehicleItemUI = (vehicle: VehicleRecord ): IVehicleItemUI => {



  return {
    vehicle,
  };
};