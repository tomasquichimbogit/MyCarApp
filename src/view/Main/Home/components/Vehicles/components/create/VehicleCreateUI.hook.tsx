import type { Control } from "react-hook-form";
import { useCreateVehicle, type VehicleRecord } from "../../../../../../../services/vehiculo.service";
import { useVehicleCreateForm } from "./form/useVehicleCreateForm";
import { useModal } from "tomascomponents";
import { useMemo } from "react";
import { BRANDS } from "../../../../../../../constants/Brands";
import { MODELS } from "../../../../../../../constants/Models";
import type { DefaultOptionType } from "antd/es/select";
import { COLORS } from "../../../../../../../constants/Colors";
import { VEHICLE_KEYS } from "../../../../../../../services/keys";
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
  const { methods } = useVehicleCreateForm();
  const { closeModal } = useModal();
  const { control, handleSubmit, watch } = methods;
  const { mutate: createVehicle, isPending: isCreatingVehicle } = useCreateVehicle();
  const queryClient = useQueryClient();
  const brand = watch("marca");

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

  const brandsOptions = useMemo(() => {
    return BRANDS.map((brand) => ({
      label: brand.name,
      value: brand.name,
    }));
  }, []);

  const modelsOptions = useMemo(() => {
    const selectedBrand = BRANDS.find((b) => b.name === brand);
    if (!selectedBrand) return [];
    const modelsByBrand = MODELS[selectedBrand.name] ?? MODELS.Otra ?? [];
    return modelsByBrand.map((model) => ({
      label: model.name,
      value: model.name,
    }));
  }, [brand]);

  const colorsOptions = useMemo(() => {
    return COLORS.map((color) => ({
      label: color.name,
      value: color.name,
    }));
  }, []);




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
