import type { Control } from "react-hook-form";
import type { VehicleInsert } from "../../../../../../../services/vehiculo.service";
import { useVehicleCreateForm } from "./form/useVehicleCreateForm";
import { useModal } from "tomascomponents";
import { useMemo } from "react";
import { BRANDS } from "../../../../../../../constants/Brands";
import { MODELS } from "../../../../../../../constants/Models";
import type { DefaultOptionType } from "antd/es/select";
import { COLORS } from "../../../../../../../constants/Colors";


export interface IVehicleCreateUI {
  control: Control<VehicleInsert>;
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

  const brand = watch("marca");

  const onSubmit = async (data: VehicleInsert) => {
    console.log(data);
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  const brandsOptions = useMemo(() => {
    return BRANDS.map((brand) => ({
      label: brand.name,
      value: brand.id,
    }));
  }, []);

  // filtrado de los modelos
  const modelsOptions = useMemo(() => {
    const selectedBrand = BRANDS.find((b) => `${b.id}` === `${brand}`);
    if (!selectedBrand) return [];
    const modelsByBrand = MODELS[selectedBrand.name] ?? MODELS.Otra ?? [];
    return modelsByBrand.map((model) => ({
      label: model.name,
      value: model.id,
    }));
  }, [brand]);

  const colorsOptions = useMemo(() => {
    return COLORS.map((color) => ({
      label: color.name,
      value: color.id,
    }));
  }, []);


  return {
    control,
    closeModal,
    handleFormSubmit,
    loading: false,
    brandsOptions,
    modelsOptions,
    colorsOptions,
  };
};
