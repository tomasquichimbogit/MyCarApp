import { ConfirmDeleteComponent } from "../../../../../../../../components/Render/ConfirmDeleteComponent";
import { useDeleteVehicle } from "../../../../../../../../services/vehiculo.service";
import { useModal } from "tomascomponents";
import { useQueryClient } from "@tanstack/react-query";
import { VEHICLE_KEYS } from "../../../../../../../../services/keys";
import { useCallback } from "react";

export const ConfirmDeleteItemUIView = ({ vehicleId }: { vehicleId: string }) => {


    const { mutate: deleteVehicle, isPending: isDeletingVehicle } = useDeleteVehicle();
    const { closeModal } = useModal();
    const queryClient = useQueryClient();


    const handleDeleteVehicle = useCallback(() => {
        deleteVehicle(vehicleId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: VEHICLE_KEYS.init, exact: false });
                closeModal();
            },
        });
    }, []);


    return <div>
        <ConfirmDeleteComponent description="¿Estás seguro de querer eliminar este vehículo?"
            onConfirm={handleDeleteVehicle} onCancel={closeModal} isLoading={isDeletingVehicle} />
    </div>;
}