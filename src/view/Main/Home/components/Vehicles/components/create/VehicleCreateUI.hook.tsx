import type { Control } from "react-hook-form";
import type { VehicleInsert } from "../../../../../../../services/vehiculo.service";
import { useVehicleCreateForm } from "./form/useVehicleCreateForm";
import { useModal } from "tomascomponents";

export interface IVehicleCreateUI {
  control: Control<VehicleInsert>;
  closeModal: () => void;
  handleFormSubmit: () => void;
  loading?: boolean;
}

export const useVehicleCreateUI = (): IVehicleCreateUI => {
  const { methods } = useVehicleCreateForm();
  const { closeModal } = useModal();
  const { control, handleSubmit } = methods;

  const onSubmit = async (data: VehicleInsert) => {
    console.log(data);
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };


  return {
    control,
    closeModal,
    handleFormSubmit,
    loading: false,
  };
};
