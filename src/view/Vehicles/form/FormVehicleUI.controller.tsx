import { useFormVehicleUIHook } from "./FormVehicleUI.hook";
import { FormVehicleUIView } from "./FormVehicleUI.view";

interface FormVehicleUIProps {
  mode?: "create" | "update";
  vehicleId?: number;
}

export const FormVehicleUI = ({ mode = "create", vehicleId }: FormVehicleUIProps) => {
  const hook = useFormVehicleUIHook({ mode, vehicleId });
  return <FormVehicleUIView {...hook} />;
};