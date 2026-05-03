import type { Control } from "react-hook-form";
import { useCreateVehicle, type VehicleRecord } from "@/services/vehiculo.service";
import { useVehicleCreateForm } from "../form/useVehicleCreateForm";
import { useModal } from "tomascomponents";
import type { DefaultOptionType } from "antd/es/select";
import { VEHICLE_KEYS } from "@/services/keys";
import { useQueryClient } from "@tanstack/react-query";

export interface IVehicleCreateUI {
  control: Control<VehicleRecord>;
  closeModal: () => void;
  handleFormSubmit: () => void;
  loading?: boolean;
  brandsOptions: DefaultOptionType[];
  modelsOptions: DefaultOptionType[];
  colorsOptions: DefaultOptionType[];
}

export const useVehicleCreateUI = (): IVehicleCreateUI => {
  const { methods, brandsOptions, modelsOptions, colorsOptions } = useVehicleCreateForm();
  const { closeModal } = useModal();
  const { control, handleSubmit } = methods;
  const { mutate: createVehicle, isPending: isCreatingVehicle } = useCreateVehicle();
  const queryClient = useQueryClient();

  const onSubmit = (data: VehicleRecord) => {
    createVehicle(data,{
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: VEHICLE_KEYS.init, exact: false });
        closeModal();
      },  
    });
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, (errors) => {
      console.log(errors);
    })();
  };



  return {
    control,
    closeModal,
    handleFormSubmit,
    loading: isCreatingVehicle,
    brandsOptions,
    modelsOptions,
    colorsOptions,
  };
};
