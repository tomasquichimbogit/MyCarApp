import { useCallback } from "react";
import { useModal } from "tomascomponents";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmDeleteComponent } from "@/components/Render/ConfirmDeleteComponent";
import { useDeleteMaintenance } from "@/services/maintenance.service";
import { MAINTENANCE_KEYS } from "@/services/keys";

export const ConfirmDeleteItemUIView = ({ maintenanceId }: { maintenanceId: string }) => {
  const { mutate: deleteMaintenance, isPending: isDeletingMaintenance } = useDeleteMaintenance();
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const handleDeleteMaintenance = useCallback(() => {
    deleteMaintenance(maintenanceId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: MAINTENANCE_KEYS.init, exact: false });
        closeModal();
      },
    });
  }, [closeModal, deleteMaintenance, queryClient, maintenanceId]);

  return (
    <div>
      <ConfirmDeleteComponent
        description="¿Estás seguro de querer eliminar este mantenimiento?"
        onConfirm={handleDeleteMaintenance}
        onCancel={closeModal}
        isLoading={isDeletingMaintenance}
      />
    </div>
  );
};
