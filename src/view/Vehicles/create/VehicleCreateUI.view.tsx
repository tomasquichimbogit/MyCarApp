import { Tabs } from "antd";
import { FormVehicleUI } from "../form/FormVehicleUI.controller";
import { FormSimpleVehicleUI } from "../form-simple/FormSimpleVehicleUI.controller";

export const VehicleCreateUIView = () => {
  return (
    <div>
      <Tabs
        items={[
          {
            label: "Vehículo simple",
            key: "simple-vehicle",
            children: <FormSimpleVehicleUI />,
          },
          {
            label: "Vehículo completo",
            key: "vehicle",
            children: <FormVehicleUI />,
          },
        ]}
      />
    </div>
  );
};
