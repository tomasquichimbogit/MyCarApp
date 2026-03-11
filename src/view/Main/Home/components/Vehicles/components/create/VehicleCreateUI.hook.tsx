import type { Control } from "react-hook-form";
import type { VehicleInsert } from "../../../../../../../services/vehiculo.service";
import { useVehicleCreateForm } from "./form/useVehicleCreateForm";

export interface IVehicleCreateUI {
  control: Control<VehicleInsert>;
  handleFormSubmit: () => void;
}

export const useVehicleCreateUI = () => {
  const { methods } = useVehicleCreateForm();

  const { control, handleSubmit } = methods;

  const onSubmit = async (data: VehicleInsert) => {
    console.log(data);
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return {
    control,
    handleFormSubmit,
  };
};
