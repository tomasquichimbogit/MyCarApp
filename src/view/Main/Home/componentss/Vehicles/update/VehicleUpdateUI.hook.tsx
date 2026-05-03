import type { VehicleRecord } from "@/services/vehiculo.service";
import { useVehicleCreateForm } from "../form/useVehicleCreateForm";
import type { Control } from "react-hook-form";
import type { DefaultOptionType } from "antd/es/select";
import type { IVehicleUpdateUIProps } from "./VehicleUpdateUI.controller";
import { useEffect } from "react";
import { useModal } from "tomascomponents";

export interface IVehicleUpdateUI {
  control: Control<VehicleRecord>;
  handleFormSubmit: () => void;
  brandsOptions: DefaultOptionType[];
  modelsOptions: DefaultOptionType[];
  colorsOptions: DefaultOptionType[];
  closeModal: () => void;
}

export const useVehicleUpdateUI = (props: IVehicleUpdateUIProps): IVehicleUpdateUI => {
  const { vehicle } = props;
 
  const {closeModal} = useModal();
  const { methods, brandsOptions, modelsOptions, colorsOptions } = useVehicleCreateForm();
  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    reset(vehicle);
  }, [reset, vehicle]);
  
    const onSubmit = (data: VehicleRecord) => {
    console.log('data =>',data);
    };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, (errors) => {
      console.log(errors);
    })();
  };


    return {
    control,
    handleFormSubmit,
    brandsOptions,
    modelsOptions,
    colorsOptions,
    closeModal,
  };
};