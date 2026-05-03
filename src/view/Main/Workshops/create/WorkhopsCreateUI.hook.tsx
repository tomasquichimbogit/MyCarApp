import type { Control } from "react-hook-form";
import { useCreateWorkshop, type WorkshopRecord } from "@/services/taller.service";
import { useWorkhopsForm } from "../form/WorkhopsFormUI.hook";
import { useModal } from "tomascomponents";
import { useQueryClient } from "@tanstack/react-query";
import { WORKSHOP_KEYS } from "@/services/keys";

export interface IWorkhopsCreateUI {
  control: Control<WorkshopRecord>;
  closeModal: () => void;
  handleFormSubmit: () => void;
  loading?: boolean;
}

export const useWorkhopsCreateUI = (): IWorkhopsCreateUI => {
  const methods = useWorkhopsForm();
  const { closeModal } = useModal();
  const { control, handleSubmit } = methods;
  const { mutate: createWorkshop, isPending: isCreatingWorkshop } = useCreateWorkshop();
  const queryClient = useQueryClient();

  const onSubmit = (data: WorkshopRecord) => {
    createWorkshop(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: WORKSHOP_KEYS.init, exact: false });
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
    loading: isCreatingWorkshop,
  };
};
