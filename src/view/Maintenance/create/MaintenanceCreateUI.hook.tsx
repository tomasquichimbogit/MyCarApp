import { PATHS } from "@/router/paths";
import { useCreateMaintenance } from "@/services/maintenance/maintenance.services";
import { useFormController } from "@/hooks/useFormController";
import { useRouteQueryParams } from "@/hooks/useRouteQueryParams";
import type { DefaultOptionType } from "antd/es/select";
import { useMemo } from "react";
import { useForm, type Control, type UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNotify } from "tomascomponents";
import { schemaCreateMaintenanceUI, type ICreateMaintenanceUI } from "./interface";
import { zodResolver } from "@hookform/resolvers/zod";

export interface IUseMaintenanceCreateUIHook {
  handleCancel: () => void;
  handleFormSubmit: () => void;
  control: Control<ICreateMaintenanceUI>;
  maintenanceTypeOptions: DefaultOptionType[];
  isSubmitting: boolean;
  methods: UseFormReturn<ICreateMaintenanceUI>;
}

export const useMaintenanceCreateUIHook = (): IUseMaintenanceCreateUIHook => {
  const navigate = useNavigate();
  const { notify } = useNotify();
  const { errorForm } = useFormController();
  const { mutate: createMaintenance, isPending } = useCreateMaintenance();
  const { getNumberParam } = useRouteQueryParams();
  const vehicleId = getNumberParam("vehicleId");


  const methods = useForm<ICreateMaintenanceUI>({
    resolver: zodResolver(schemaCreateMaintenanceUI),
    defaultValues: {
      maintenance_date: new Date().toISOString().slice(0, 10),
      maintenance_type: "",
      description: "",
      mileage: 0,
      cost: 0,
      vehicle_id: vehicleId,
    },
  });

  const { control, handleSubmit } = methods;

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

  const handleCancel = () => {
    const navigatePath = vehicleId ? `${PATHS.maintenance}?vehicleId=${vehicleId}` : PATHS.maintenance;
    navigate(navigatePath);
  };

  const onSubmit = (data: ICreateMaintenanceUI) => {
    createMaintenance({
      ...data,
      maintenance_date: data.maintenance_date ?? new Date().toISOString().slice(0, 10),
    }, {
      onSuccess: () => {
        notify("success", {
          title: "Mantenimiento creado",
          description: "El mantenimiento se registró correctamente.",
        });
        handleCancel();
      },
    });
  };

    const handleFormSubmit = () => {
    handleSubmit(onSubmit, (errors) => {
      errorForm(errors);  
    })();
  };

  return {
    handleCancel,
    handleFormSubmit,
    control,
    maintenanceTypeOptions,
    isSubmitting: isPending,
    methods,
  };
};
