import { useFormSimpleVehicleUIHook } from "./FormSimpleVehicleUI.hook";
import { FormSimpleVehicleUIView } from "./FormSimpleVehicleUI.view";
import { ETypeVehicle } from "@/enums";


interface FormSimpleVehicleUIProps {
  vehicleType?: ETypeVehicle;
}

export const FormSimpleVehicleUI = ({ vehicleType }: FormSimpleVehicleUIProps) => {
  const hook = useFormSimpleVehicleUIHook({ vehicleType });
  return <FormSimpleVehicleUIView {...hook} />;
};