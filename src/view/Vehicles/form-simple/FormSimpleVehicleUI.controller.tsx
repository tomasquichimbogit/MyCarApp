import { useFormSimpleVehicleUIHook } from "./FormSimpleVehicleUI.hook";
import { FormSimpleVehicleUIView } from "./FormSimpleVehicleUI.view";



export const FormSimpleVehicleUI = () => {
  const hook = useFormSimpleVehicleUIHook();
  return <FormSimpleVehicleUIView {...hook} />;
};