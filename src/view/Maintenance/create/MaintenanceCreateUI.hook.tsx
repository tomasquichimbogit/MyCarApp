import { PATHS } from "@/router/paths";
import { useCreateMaintenance } from "@/services/maintenance/maintenance.services";
import { useVehicles } from "@/services/vehicles/vehicles.services";
import { useWorkshops } from "@/services/workshops/workshops.services";
import { useFormController } from "@/hooks/useFormController";
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
  vehiclesOptions: DefaultOptionType[];
  workshopsOptions: DefaultOptionType[];
  maintenanceTypeOptions: DefaultOptionType[];
  isLoadingResources: boolean;
  isErrorResources: boolean;
  isSubmitting: boolean;
  methods: UseFormReturn<ICreateMaintenanceUI>;
}

export const useMaintenanceCreateUIHook = (): IUseMaintenanceCreateUIHook => {
  const navigate = useNavigate();
  const { notify } = useNotify();
  const { errorForm } = useFormController();
  const { mutate: createMaintenance, isPending } = useCreateMaintenance();
  const {
    data: vehicles = [],
    isLoading: isLoadingVehicles,
    isError: isErrorVehicles,
  } = useVehicles();
  const {
    data: workshops = [],
    isLoading: isLoadingWorkshops,
    isError: isErrorWorkshops,
  } = useWorkshops();

  const methods = useForm<ICreateMaintenanceUI>({
    resolver: zodResolver(schemaCreateMaintenanceUI),
    defaultValues: {
      maintenance_date: new Date().toISOString().slice(0, 10),
      maintenance_type: "",
      description: "",
      mileage: 0,
      cost: 0,
    },
  });

  const { control, handleSubmit } = methods;

  const vehiclesOptions = useMemo<DefaultOptionType[]>(
    () =>
      vehicles.map((vehicle) => ({
        label: vehicle.plate,
        value: Number(vehicle.id),
      })),
    [vehicles],
  );

  const workshopsOptions = useMemo<DefaultOptionType[]>(
    () =>
      workshops.map((workshop) => ({
        label: workshop.name,
        value: workshop.id,
      })),
    [workshops],
  );

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
    navigate(PATHS.maintenance);
  };

  const onSubmit = (data: ICreateMaintenanceUI) => {
    createMaintenance(data, {
      onSuccess: () => {
        notify("success", {
          title: "Mantenimiento creado",
          description: "El mantenimiento se registró correctamente.",
        });
        navigate(PATHS.maintenance);
      },
    });
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, errorForm)();
  };

  return {
    handleCancel,
    handleFormSubmit,
    control,
    vehiclesOptions,
    workshopsOptions,
    maintenanceTypeOptions,
    isLoadingResources: isLoadingVehicles || isLoadingWorkshops,
    isErrorResources: isErrorVehicles || isErrorWorkshops,
    isSubmitting: isPending,
    methods,
  };
};
