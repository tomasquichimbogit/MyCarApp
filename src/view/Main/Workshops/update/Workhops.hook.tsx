import { useEffect } from "react";
import type { Control } from "react-hook-form";
import type { WorkshopRecord } from "@/services/taller.service";
import type { IWorkhopsUpdateUIProps } from "./Workhops.controller";
import { useWorkhopsForm } from "../form/WorkhopsFormUI.hook";
import { useModal } from "tomascomponents";
import { useUpdateWorkshopMutation } from "@/services/taller.service";
import { useQueryClient } from "@tanstack/react-query";
import { WORKSHOP_KEYS } from "@/services/keys";

export interface IWorkhopsUpdateUI {
  control: Control<WorkshopRecord>;
  handleFormSubmit: () => void;
  closeModal: () => void;
  loading?: boolean;
}

export const useWorkhopsUpdateUI = (props: IWorkhopsUpdateUIProps): IWorkhopsUpdateUI => {
  const { workshop } = props;
  const { closeModal } = useModal();
  const methods = useWorkhopsForm();
  const { control, handleSubmit, reset } = methods;
  const { mutate: updateWorkshop, isPending: isUpdatingWorkshop } = useUpdateWorkshopMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    reset(workshop);
  }, [reset, workshop]);

  const onSubmit = (data: WorkshopRecord) => {
    if (!workshop.id) return;

    updateWorkshop(
      { id: workshop.id, values: data },
      {
        onSuccess: () => {
          closeModal();
          queryClient.invalidateQueries({ queryKey: WORKSHOP_KEYS.init, exact: false });
        },
      },
    );
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, (errors) => {
      console.log(errors);
    })();
  };

  return {
    control,
    handleFormSubmit,
    closeModal,
    loading: isUpdatingWorkshop,
  };
};
