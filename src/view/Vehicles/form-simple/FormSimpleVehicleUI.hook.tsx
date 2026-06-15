import { useEffect } from "react";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormSimpleVehicleUI, type TSchemaFormSimpleVehicleUI } from "./interface";
import { useCurrentPerson } from "@/services/person/person.services";
import { type ICreateSimpleVehiclePayload, useCreateSimpleVehicle } from "@/services/vehicles/vehicles.services";
import { useFormController } from "@/hooks/useFormController";
import { useModal, useNotify } from "tomascomponents";

export interface IUseFormSimpleVehicleUIHook {
  control: Control<TSchemaFormSimpleVehicleUI>;
  loadingResources: boolean;
  errorResources: boolean;
  missingProfile: boolean;
  isSubmitting: boolean;
  handleFormSubmit: () => void;
  submitLabel: string;
  closeModal: () => void;
}

export const useFormSimpleVehicleUIHook = () => {
  const { closeModal } = useModal();
  const { notify } = useNotify();
  const { errorForm } = useFormController();
  const { mutate: createSimpleVehicleMutation, isPending: isCreating } = useCreateSimpleVehicle();
  const { data: person, isLoading: isLoadingPerson, isError: isErrorPerson } = useCurrentPerson();

  const methods = useForm<TSchemaFormSimpleVehicleUI>({
    resolver: zodResolver(schemaFormSimpleVehicleUI),   
  });

  const { control, handleSubmit, setValue } = methods;



  useEffect(() => {
    if (person?.id) {
      setValue("person_id", person.id);
    }
  }, [person, setValue]);



  const loadingResources = isLoadingPerson;
  const missingProfile = !isLoadingPerson && !isErrorPerson && !person;
  const errorResources = isErrorPerson || missingProfile;
  const isSubmitting = isCreating;
  const submitLabel = "Guardar vehículo";

  const onSubmit = (data: TSchemaFormSimpleVehicleUI) => {
    const payload: ICreateSimpleVehiclePayload = {
      person_id: data.person_id,
      license_plate: data.license_plate.trim().toUpperCase(),
    };

    createSimpleVehicleMutation(payload, {
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
    isSubmitting,
    handleFormSubmit,
    submitLabel,
    closeModal,
  };
};
