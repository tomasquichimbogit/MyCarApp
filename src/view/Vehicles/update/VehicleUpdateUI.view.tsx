import { FormVehicleUI } from "../form/FormVehicleUI.controller";

interface VehicleUpdateUIViewProps {
  vehicleId: number;
}

export const VehicleUpdateUIView = ({ vehicleId }: VehicleUpdateUIViewProps) => {
  return (
    <div>
      <FormVehicleUI mode="update" vehicleId={vehicleId} />
    </div>
  );
};
