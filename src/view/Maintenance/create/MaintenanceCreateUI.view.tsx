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
      <div className="flex max-h-[calc(100dvh-110px)] flex-col md:max-h-[calc(100dvh-115px)]">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <FormProvider {...methods}>
            <div className="flex flex-col gap-1">
              <StepOneUI />
              <StepTwoUI />
              <StepThreeUI />
              <StepFourUI />
              <StepFiveUI />
            </div>
          </FormProvider>
        </div>

        <div className="shrink-0 pt-3">
          <div className="flex flex-row gap-2 justify-center">
            <Button variant="outlined" title="Cancelar" onClick={handleCancel} />
            <Button
              title="Guardar"
              onClick={handleFormSubmit}
              loading={isSubmitting || isLoadingResources}
            />
          </div>
        </div>
      </div>
    </CentralContainerUI>
  );
};
