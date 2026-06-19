import { Tabs } from "antd";
import { FormVehicleUI } from "../form/FormVehicleUI.controller";
import { FormSimpleVehicleUI } from "../form-simple/FormSimpleVehicleUI.controller";
import { ETypeVehicle } from "@/enums";

interface VehicleCreateUIViewProps {
  vehicleType?: ETypeVehicle;
}

export const VehicleCreateUIView = ({ vehicleType = ETypeVehicle.CAR }: VehicleCreateUIViewProps) => {
  const vehicleLabel = vehicleType === ETypeVehicle.MOTORCYCLE ? "motocicleta" : "vehículo";

  return (
    <div>
      <Tabs
        items={[
          {
            label: `${vehicleLabel[0].toUpperCase()}${vehicleLabel.slice(1)} simple`,
            key: "simple-vehicle",
            children: <FormSimpleVehicleUI vehicleType={vehicleType} />,
          },
          {
            label: `${vehicleLabel[0].toUpperCase()}${vehicleLabel.slice(1)} completo`,
            key: "vehicle",
            children: <FormVehicleUI vehicleType={vehicleType} />,
          },
        ]}
      />
    </div>
  );
};
