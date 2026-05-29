import { useMemo } from "react";
import type { Control } from "react-hook-form";
import { useModal } from "tomascomponents";
import { useQueryClient } from "@tanstack/react-query";
import { MAINTENANCE_KEYS } from "@/services/keys";
import {
  useCreateMaintenance,
  type MaintenanceRecord,
} from "@/services/maintenance.service";
import { useMyVehiclesQuery } from "@/services/vehiculo.service";
import { useWorkshopsQuery } from "@/services/taller.service";
import { useMaintenanceForm } from "../form/MaintenanceFormUI.hook";
import type { DefaultOptionType } from "antd/es/select";

export interface IMaintenanceCreateUI {
  control: Control<MaintenanceRecord>;
  closeModal: () => void;
  handleFormSubmit: () => void;
  loading?: boolean;
  vehicleOptions: DefaultOptionType[];
  workshopOptions: DefaultOptionType[];
}

export const useMaintenanceCreateUI = (): IMaintenanceCreateUI => {
  const methods = useMaintenanceForm();
  const { closeModal } = useModal();
  const { control, handleSubmit } = methods;
  const { mutate: createMaintenance, isPending: isCreatingMaintenance } = useCreateMaintenance();
  const queryClient = useQueryClient();
  const { data: vehicles = [] } = useMyVehiclesQuery();
  const { data: workshops = [] } = useWorkshopsQuery();

  const vehicleOptions = useMemo(() => {
    return vehicles
      .filter((v): v is typeof v & { id: string } => typeof v.id === "string")
      .map((v) => ({
        label: `${v.placa} · ${v.marca} ${v.modelo}`,
        value: v.id,
      }));
  }, [vehicles]);

  const workshopOptions = useMemo(() => {
    return workshops
      .filter((w): w is typeof w & { id: string } => typeof w.id === "string")
      .map((w) => ({
        label: w.nombre,
        value: w.id,
      }));
  }, [workshops]);

  const onSubmit = (data: MaintenanceRecord) => {
    createMaintenance(
      {
        ...data,
        fecha_servicio: new Date(data.fecha_servicio).toISOString(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: MAINTENANCE_KEYS.init, exact: false });
          closeModal();
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
    closeModal,
    handleFormSubmit,
    loading: isCreatingMaintenance,
    vehicleOptions,
    workshopOptions,
  };
};
