import { useEffect, useMemo } from "react";
import { useForm, type Control, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaCreateMaintenanceUI, type ICreateMaintenanceUI } from "../create/interface";
import { useMaintenanceById, useUpdateMaintenance } from "@/services/maintenance/maintenance.services";
import { useFormController } from "@/hooks/useFormController";
import { useModal, useNotify } from "tomascomponents";
import type { DefaultOptionType } from "antd/es/select";

interface UseMaintenanceUpdateUIHookProps {
  maintenanceId: number;
}

export interface IUseMaintenanceUpdateUIHook {
  control: Control<ICreateMaintenanceUI>;
  methods: UseFormReturn<ICreateMaintenanceUI>;
  maintenanceTypeOptions: DefaultOptionType[];
  isSubmitting: boolean;
  isLoadingDetail: boolean;
  handleFormSubmit: () => void;
  handleCancel: () => void;
}

export const useMaintenanceUpdateUIHook = ({
  maintenanceId,
}: UseMaintenanceUpdateUIHookProps): IUseMaintenanceUpdateUIHook => {
  const { closeModal } = useModal();
  const { notify } = useNotify();
  const { errorForm } = useFormController();
  const { mutate: updateMaintenance, isPending } = useUpdateMaintenance();
  const { data: detail, isLoading: isLoadingDetail } = useMaintenanceById(maintenanceId);

  const methods = useForm<ICreateMaintenanceUI>({
    resolver: zodResolver(schemaCreateMaintenanceUI),
  });

  const { control, handleSubmit, setValue } = methods;

  useEffect(() => {
    if (!detail) return;
    setValue("vehicle_id", detail.vehicle_id);
    if (detail.workshop_id) setValue("workshop_id", detail.workshop_id);
    setValue("maintenance_type", detail.maintenance_type);
    if (detail.description) setValue("description", detail.description);
    if (detail.mileage) setValue("mileage", detail.mileage);
    if (detail.cost) setValue("cost", detail.cost);
    if (detail.maintenance_date) setValue("maintenance_date", detail.maintenance_date.slice(0, 10));
  }, [detail, setValue]);

  const maintenanceTypeOptions = useMemo<DefaultOptionType[]>(
    () => [
      { label: "Preventivo", value: "Preventivo" },
      { label: "Correctivo", value: "Correctivo" },
      { label: "Cambio de aceite", value: "Cambio de aceite" },
      { label: "Revisión general", value: "Revisión general" },
      { label: "Otro", value: "Otro" },
    ],
    [],
  );

  const onSubmit = (data: ICreateMaintenanceUI) => {
    updateMaintenance(
      {
        id: maintenanceId,
        ...data,
        maintenance_date: data.maintenance_date ?? new Date().toISOString().slice(0, 10),
      },
      {
        onSuccess: () => {
          notify("success", {
            title: "Mantenimiento actualizado",
            description: "Los cambios se guardaron correctamente.",
          });
          closeModal();
        },
      },
    );
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, errorForm)();
  };

  return {
    control,
    methods,
    maintenanceTypeOptions,
    isSubmitting: isPending,
    isLoadingDetail,
    handleFormSubmit,
    handleCancel: closeModal,
  };
};
