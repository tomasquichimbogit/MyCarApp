import { Button } from "tomascomponents";
import type { IUseMaintenanceCreateUIHook } from "./MaintenanceCreateUI.hook";
import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import { Alert } from "antd";
import { StepOneUI } from "./components/StepOneUI.view";
import { StepTwoUI } from "./components/StepTwoUI.view";
import { StepThreeUI } from "./components/StepThreeUI.view";
import { StepFourUI } from "./components/StepFourUI.view";
import { StepFiveUI } from "./components/StepFiveUI.view";
import { FormProvider } from "react-hook-form";

export const MaintenanceCreateUIView = ({
  handleCancel,
  handleFormSubmit,
  // control,
  // vehiclesOptions,
  // workshopsOptions,
  // maintenanceTypeOptions,
  isLoadingResources,
  isErrorResources,
  isSubmitting,
  methods,
}: IUseMaintenanceCreateUIHook) => {
  if (isErrorResources) {
    return (
      <CentralContainerUI title="Nuevo Mantenimiento">
        <Alert
          message="Error"
          description="No se pudieron cargar los talleres o vehículos. Intenta de nuevo."
          type="error"
          showIcon
        />
      </CentralContainerUI>
    );
  }

  return (
    <CentralContainerUI title="Nuevo Mantenimiento" subtitle="Sigue los pasos. Es muy fácil.">
      <div className="flex flex-col gap-2">
        <FormProvider {...methods}>
          {/* 
        
          <FormSelect
            label="Vehículo"
            name="vehicle_id"
            placeholder="Selecciona un vehículo"
            options={vehiclesOptions}
            control={control}
            disabled={isLoadingResources}
          /> */}
          <StepOneUI />
          <StepTwoUI />
          <StepThreeUI />
          <StepFourUI />
          <StepFiveUI />
          {/* <FormSelect
          <FormSelect
            label="Tipo"
            name="maintenance_type"
            placeholder="Selecciona un tipo"
            options={maintenanceTypeOptions}
            control={control}
          />

          <FormInput
            label="Descripción"
            name="description"
            placeholder="Descripción del mantenimiento"
            control={control}
          />
          <FormNumberInput
            label="Kilometraje"
            name="mileage"
            placeholder="Kilometraje"
            control={control}
            required
          />
          <FormNumberInput
            label="Costo"
            name="cost"
            placeholder="Costo"
            control={control}
            required
          />
          <FormInput
            label="Fecha"
            name="maintenance_date"
            placeholder="YYYY-MM-DD"
            control={control}
            required
          /> */}
        </FormProvider>
        <div className="flex flex-row gap-2 justify-end">
          <Button variant="outlined" title="Cancelar" onClick={handleCancel} />
          <Button
            title="Guardar"
            onClick={handleFormSubmit}
            loading={isSubmitting || isLoadingResources}
          />
        </div>
      </div>
    </CentralContainerUI>
  );
};
