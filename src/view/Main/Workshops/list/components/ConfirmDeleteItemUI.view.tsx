import { useCallback } from "react";
import { useModal } from "tomascomponents";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDeleteComponent } from "@/components/Render/ConfirmDeleteComponent";
import { useDeleteWorkshop } from "@/services/taller.service";
import { WORKSHOP_KEYS } from "@/services/keys";

export const ConfirmDeleteItemUIView = ({ workshopId }: { workshopId: string }) => {
  const { mutate: deleteWorkshop, isPending: isDeletingWorkshop } = useDeleteWorkshop();
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const handleDeleteWorkshop = useCallback(() => {
    deleteWorkshop(workshopId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: WORKSHOP_KEYS.init, exact: false });
        closeModal();
      },
    });
  }, [closeModal, deleteWorkshop, queryClient, workshopId]);

  return (
    <div>
      <ConfirmDeleteComponent
        description="¿Estás seguro de querer eliminar este taller?"
        onConfirm={handleDeleteWorkshop}
        onCancel={closeModal}
        isLoading={isDeletingWorkshop}
      />
    </div>
  );
};
