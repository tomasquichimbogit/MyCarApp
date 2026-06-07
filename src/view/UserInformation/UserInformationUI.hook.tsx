import { useEffect } from "react";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormController } from "@/hooks/useFormController";
import {
  useCreatePerson,
  useCurrentPerson,
  useDeletePerson,
  useUpdatePerson,
} from "@/services/person/person.services";
import { schemaUserInformation, type TSchemaUserInformation } from "./interface";
import { useNotify } from "tomascomponents";

export interface IUseUserInformationUIHook {
  control: Control<TSchemaUserInformation>;
  isLoading: boolean;
  isError: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  hasProfile: boolean;
  handleFormSubmit: () => void;
  handleDeleteProfile: () => void;
}

export const useUserInformationUIHook = (): IUseUserInformationUIHook => {
  const { notify } = useNotify();
  const { errorForm } = useFormController();
  const authUser = useAuthStore((state) => state.user?.user);
  const {
    data: person,
    isLoading,
    isError,
  } = useCurrentPerson();
  const { mutate: createPerson, isPending: isCreating } = useCreatePerson();
  const { mutate: updatePerson, isPending: isUpdating } = useUpdatePerson();
  const { mutate: deletePerson, isPending: isDeleting } = useDeletePerson();

  const { control, handleSubmit, reset } = useForm<TSchemaUserInformation>({
    resolver: zodResolver(schemaUserInformation),
    defaultValues: {
      names: "",
      last_names: "",
      phone: "",
      email: authUser?.email ?? "",
    },
  });

  useEffect(() => {
    if (person) {
      reset({
        names: person.names ?? "",
        last_names: person.last_names ?? "",
        phone: person.phone ?? "",
        email: person.email ?? authUser?.email ?? "",
      });
      return;
    }

    reset({
      names: "",
      last_names: "",
      phone: "",
      email: authUser?.email ?? "",
    });
  }, [person, authUser?.email, reset]);

  const onSubmit = (data: TSchemaUserInformation) => {
    if (person) {
      updatePerson(
        {
          id: person.id,
          names: data.names.trim(),
          last_names: data.last_names.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
        },
        {
          onSuccess: () => {
            notify("success", {
              title: "Perfil actualizado",
              description: "Tu información se guardó correctamente.",
            });
          },
        },
      );
      return;
    }

    createPerson(
      {
        names: data.names.trim(),
        last_names: data.last_names.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
      },
      {
        onSuccess: () => {
          notify("success", {
            title: "Perfil creado",
            description: "Tu información se registró correctamente.",
          });
        },
      },
    );
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, errorForm)();
  };

  const handleDeleteProfile = () => {
    if (!person?.id) return;

    deletePerson(person.id, {
      onSuccess: () => {
        notify("success", {
          title: "Perfil eliminado",
          description: "Tu información personal fue eliminada.",
        });
      },
    });
  };

  return {
    control,
    isLoading,
    isError,
    isSubmitting: isCreating || isUpdating,
    isDeleting,
    hasProfile: !!person,
    handleFormSubmit,
    handleDeleteProfile,
  };
};
