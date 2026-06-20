import { Tabs } from "antd";
import { FormVehicleUI } from "../form/FormVehicleUI.controller";
import { FormSimpleVehicleUI } from "../form-simple/FormSimpleVehicleUI.controller";
import { ETypeVehicle } from "@/enums";
import { VehicleCreateMotorcycleUIView } from "../create-motorcycle";

interface VehicleCreateUIViewProps {
  vehicleType?: ETypeVehicle;
}

export const VehicleCreateUIView = ({ vehicleType = ETypeVehicle.CAR }: VehicleCreateUIViewProps) => {
  const vehicleLabel = vehicleType === ETypeVehicle.MOTORCYCLE ? "motocicleta" : "vehículo";

  return (
    <div>
      {vehicleType === ETypeVehicle.MOTORCYCLE ? (
        <VehicleCreateMotorcycleUIView />
      ) : (
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
      )}
    </div>
  );
};
