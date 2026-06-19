import { useFormVehicleUIHook } from "./FormVehicleUI.hook";
import { FormVehicleUIView } from "./FormVehicleUI.view";
import { ETypeVehicle } from "@/enums";

interface FormVehicleUIProps {
  mode?: "create" | "update";
  vehicleId?: number;
  vehicleType?: ETypeVehicle;
}

export const FormVehicleUI = ({ mode = "create", vehicleId, vehicleType }: FormVehicleUIProps) => {
  const hook = useFormVehicleUIHook({ mode, vehicleId, vehicleType });
  return <FormVehicleUIView {...hook} />;
};