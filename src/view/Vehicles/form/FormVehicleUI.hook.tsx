import { useEffect } from "react";
import { useForm, useWatch, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormVehicleUI, type TSchemaFormVehicleUI } from "./interface";
import type { DefaultOptionType } from "antd/es/select";
import { useFormVehicleResources } from "@/hooks/useFormVehicleResources";
import { useCurrentPerson } from "@/services/person/person.services";
import { useCreateVehicle, useUpdateVehicle, useVehicleById } from "@/services/vehicles/vehicles.services";
import { useFormController } from "@/hooks/useFormController";
import { useModal, useNotify } from "tomascomponents";

interface UseFormVehicleUIHookProps {
  mode?: "create" | "update";
  vehicleId?: number;
}

export interface IUseFormVehicleUIHook {
  control: Control<TSchemaFormVehicleUI>;
  loadingResources: boolean;
  errorResources: boolean;
  missingProfile: boolean;
  brandsOptions: DefaultOptionType[];
  modelsOptions: DefaultOptionType[];
  colorsOptions: DefaultOptionType[];
  isSubmitting: boolean;
  isModelDisabled: boolean;
  handleFormSubmit: () => void;
  submitLabel: string;
  closeModal: () => void;
  isUpdateMode: boolean;
  vehicleImageItemKey: string | number;
  vehicleImageTitle: string;
}

export const useFormVehicleUIHook = ({ mode = "create", vehicleId }: UseFormVehicleUIHookProps) => {
  const isUpdateMode = mode === "update" && !!vehicleId;
  const { closeModal } = useModal();
  const { notify } = useNotify();
  const { errorForm } = useFormController();
  const { mutate: createVehicle, isPending: isCreating } = useCreateVehicle();
  const { mutate: updateVehicle, isPending: isUpdating } = useUpdateVehicle();
  const { data: person, isLoading: isLoadingPerson, isError: isErrorPerson } = useCurrentPerson();
  const {
    data: vehicleDetail,
    isLoading: isLoadingVehicle,
    isError: isErrorVehicle,
  } = useVehicleById(vehicleId ?? 0, isUpdateMode);

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
    if (!vehicleDetail) return;
    setValue("brand", vehicleDetail.brand);
    setValue("model", vehicleDetail.model);
    setValue("year", vehicleDetail.year);
    setValue("color", vehicleDetail.color);
    setValue("person_id", vehicleDetail.person_id);
    setValue("license_plate", vehicleDetail.license_plate);
  }, [vehicleDetail, setValue]);

  const loadingResources = isLoadingCatalogs || isLoadingPerson || isLoadingVehicle;
  const missingProfile = !isLoadingPerson && !isErrorPerson && !person;
  const errorResources = isErrorCatalogs || isErrorPerson || isErrorVehicle || missingProfile;
  const isModelDisabled = !selectedBrand || selectedBrand <= 0;
  const isSubmitting = isCreating || isUpdating;
  const submitLabel = isUpdateMode ? "Actualizar vehículo" : "Guardar vehículo";

  const onSubmit = (data: TSchemaFormVehicleUI) => {
    const payload = {
      brand: data.brand,
      model: data.model,
      year: data.year,
      color: data.color,
      person_id: data.person_id,
      license_plate: data.license_plate.trim().toUpperCase(),
    };

    if (isUpdateMode && vehicleId) {
      updateVehicle(
        {
          id: vehicleId,
          ...payload,
        },
        {
          onSuccess: () => {
            notify("success", {
              title: "Vehículo actualizado",
              description: "El vehículo se actualizó correctamente.",
            });
            closeModal();
          },
        },
      );
      return;
    }

    createVehicle(payload, {
      onSuccess: () => {
        notify("success", {
          title: "Vehículo creado",
          description: "El vehículo se registró correctamente.",
        });
        closeModal();
      },
    });
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, errorForm)();
  };

  return {
    control,
    loadingResources,
    errorResources,
    missingProfile,
    brandsOptions,
    modelsOptions,
    colorsOptions,
    isSubmitting,
    isModelDisabled,
    handleFormSubmit,
    submitLabel,
    closeModal,
    isUpdateMode,
    vehicleImageItemKey: vehicleId ?? -1,
    vehicleImageTitle: `Actualizar imagen - ${vehicleDetail?.license_plate ?? "vehículo"}`,
  };
};
