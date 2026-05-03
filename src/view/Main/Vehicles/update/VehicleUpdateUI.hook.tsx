import type { VehicleRecord } from "@/services/vehiculo.service";
import { useVehicleCreateForm } from "../form/useVehicleCreateForm";
import type { Control } from "react-hook-form";
import type { DefaultOptionType } from "antd/es/select";
import type { IVehicleUpdateUIProps } from "./VehicleUpdateUI.controller";
import { useEffect } from "react";
import { useModal } from "tomascomponents";
import { useUpdateVehicleMutation } from "@/services/vehiculo.service";
import { VEHICLE_KEYS } from "@/services/keys";
import { useQueryClient } from "@tanstack/react-query";

export interface IVehicleUpdateUI {
  control: Control<VehicleRecord>;
  handleFormSubmit: () => void;
  brandsOptions: DefaultOptionType[];
  modelsOptions: DefaultOptionType[];
  colorsOptions: DefaultOptionType[];
  closeModal: () => void;
  loading?: boolean;
}

export const useVehicleUpdateUI = (props: IVehicleUpdateUIProps): IVehicleUpdateUI => {
  const { vehicle } = props;
 
  const {closeModal} = useModal();
  const { methods, brandsOptions, modelsOptions, colorsOptions } = useVehicleCreateForm();
  const { control, handleSubmit, reset } = methods;
  const { mutate: updateVehicle, isPending: isUpdatingVehicle } = useUpdateVehicleMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    reset(vehicle);
  }, [reset, vehicle]);
  
    const onSubmit = (data: VehicleRecord) => {
    if (!vehicle.id) return;
    updateVehicle({ id: vehicle.id, values: data }, {
      onSuccess: () => {
        closeModal();
        queryClient.invalidateQueries({ queryKey: VEHICLE_KEYS.init, exact: false }); 
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
    handleFormSubmit,
    brandsOptions,
    modelsOptions,
    colorsOptions,
    closeModal,
    loading: isUpdatingVehicle,
  };
};