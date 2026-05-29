import { useEffect, useMemo } from "react";
import type { Control } from "react-hook-form";
import { useModal } from "tomascomponents";
import { useQueryClient } from "@tanstack/react-query";
import { MAINTENANCE_KEYS } from "@/services/keys";
import {
  useUpdateMaintenanceMutation,
  type MaintenanceRecord,
} from "@/services/maintenance.service";
import { useMyVehiclesQuery } from "@/services/vehiculo.service";
import { useWorkshopsQuery } from "@/services/taller.service";
import { isoToDatetimeLocal, useMaintenanceForm } from "../form/MaintenanceFormUI.hook";
import type { IMaintenanceUpdateUIProps } from "./MaintenanceUpdateUI.controller";
import type { DefaultOptionType } from "antd/es/select";

export interface IMaintenanceUpdateUI {
  control: Control<MaintenanceRecord>;
  handleFormSubmit: () => void;
  closeModal: () => void;
  loading?: boolean;
  vehicleOptions: DefaultOptionType[];
  workshopOptions: DefaultOptionType[];
}

export const useMaintenanceUpdateUI = (props: IMaintenanceUpdateUIProps): IMaintenanceUpdateUI => {
  const { maintenance } = props;
  const { closeModal } = useModal();
  const methods = useMaintenanceForm();
  const { control, handleSubmit, reset } = methods;
  const { mutate: updateMaintenance, isPending: isUpdatingMaintenance } = useUpdateMaintenanceMutation();
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

  useEffect(() => {
    reset({
      vehiculo_id: maintenance.vehiculo_id,
      taller_id: maintenance.taller_id,
      descripcion_servicio: maintenance.descripcion_servicio,
      costo: Number(maintenance.costo),
      fecha_servicio: isoToDatetimeLocal(maintenance.fecha_servicio),
    });
  }, [maintenance, reset]);

  const onSubmit = (data: MaintenanceRecord) => {
    if (!maintenance.id) return;
    updateMaintenance(
      {
        id: maintenance.id,
        values: {
          ...data,
          fecha_servicio: new Date(data.fecha_servicio).toISOString(),
        },
      },
      {
        onSuccess: () => {
          closeModal();
          queryClient.invalidateQueries({ queryKey: MAINTENANCE_KEYS.init, exact: false });
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
    loading: isUpdatingMaintenance,
    vehicleOptions,
    workshopOptions,
  };
};
