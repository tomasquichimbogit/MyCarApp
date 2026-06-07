import { useFormVehicleUIHook } from "./FormVehicleUI.hook";
import { FormVehicleUIView } from "./FormVehicleUI.view";

export const FormVehicleUI = () => {
    const hook = useFormVehicleUIHook();
  return <FormVehicleUIView { ...hook } />
};