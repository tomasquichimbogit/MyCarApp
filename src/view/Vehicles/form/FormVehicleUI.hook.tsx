import { useEffect } from "react";
import { useForm, useWatch, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormVehicleUI, type TSchemaFormVehicleUI } from "./interface";
import type { DefaultOptionType } from "antd/es/select";
import { useFormVehicleResources } from "@/hooks/useFormVehicleResources";
import { useCurrentPerson } from "@/services/person/person.services";
import { useCreateVehicle } from "@/services/vehicles/vehicles.services";
import { useFormController } from "@/hooks/useFormController";
import { useModal, useNotify } from "tomascomponents";

export interface IUseFormVehicleUIHook {
  control: Control<TSchemaFormVehicleUI>;
  loadingResources: boolean;
  errorResources: boolean;
  brandsOptions: DefaultOptionType[];
  modelsOptions: DefaultOptionType[];
  colorsOptions: DefaultOptionType[];
  isSubmitting: boolean;
  isModelDisabled: boolean;
  handleFormSubmit: () => void;
}

export const useFormVehicleUIHook = () => {
  const { closeModal } = useModal();
  const { notify } = useNotify();
  const { errorForm } = useFormController();
  const { mutate: createVehicle, isPending: isSubmitting } = useCreateVehicle();
  const {
    data: person,
    isLoading: isLoadingPerson,
    isError: isErrorPerson,
  } = useCurrentPerson();

  const methods = useForm<TSchemaFormVehicleUI>({
    resolver: zodResolver(schemaFormVehicleUI),
    defaultValues: {
      brand: 0,
      model: 0,
      year: new Date().getFullYear(),
      color: "",
      person_id: 0,
      license_plate: "",
    },
  });

  const { control, handleSubmit, setValue } = methods;

  const selectedBrand = useWatch({
    control,
    name: "brand",
  });

  const {
    loadingResources: isLoadingCatalogs,
    errorResources: isErrorCatalogs,
    brandsOptions,
    modelsOptions,
    colorsOptions,
  } = useFormVehicleResources(selectedBrand);

  useEffect(() => {
    if (person?.id) {
      setValue("person_id", person.id);
    }
  }, [person, setValue]);

  useEffect(() => {
    setValue("model", 0);
  }, [selectedBrand, setValue]);

  const loadingResources = isLoadingCatalogs || isLoadingPerson;
  const errorResources = isErrorCatalogs || isErrorPerson;
  const isModelDisabled = !selectedBrand || selectedBrand <= 0;

  const onSubmit = (data: TSchemaFormVehicleUI) => {
    createVehicle(
      {
        brand: data.brand,
        model: data.model,
        year: data.year,
        color: data.color,
        person_id: data.person_id,
        license_plate: data.license_plate.trim().toUpperCase(),
      },
      {
        onSuccess: () => {
          notify("success", {
            title: "Vehículo creado",
            description: "El vehículo se registró correctamente.",
          });
          closeModal();
        },
      },
    );
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, errorForm)();
  };

  return {
    control,
    loadingResources,
    errorResources,
    brandsOptions,
    modelsOptions,
    colorsOptions,
    isSubmitting,
    isModelDisabled,
    handleFormSubmit,
  };
};
