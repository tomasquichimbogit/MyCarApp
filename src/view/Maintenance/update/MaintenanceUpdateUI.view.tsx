import { Button } from "tomascomponents";
import type { IUseMaintenanceUpdateUIHook } from "./MaintenanceUpdateUI.hook";
import { StepOneUI } from "../create/components/StepOneUI.view";
import { StepTwoUI } from "../create/components/StepTwoUI.view";
import { StepThreeUI } from "../create/components/StepThreeUI.view";
import { StepFourUI } from "../create/components/StepFourUI.view";
import { StepFiveUI } from "../create/components/StepFiveUI.view";
import { FormProvider } from "react-hook-form";
import { Spin } from "antd";

export const MaintenanceUpdateUIView = ({
  methods,
  isSubmitting,
  isLoadingDetail,
  handleFormSubmit,
  handleCancel,
}: IUseMaintenanceUpdateUIHook) => {
  if (isLoadingDetail) {
    return (
      <div className="flex justify-center py-10">
        <Spin spinning />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="max-h-[70dvh] overflow-y-auto pr-1">
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

      <div className="flex flex-row justify-end gap-2 pt-1">
        <Button variant="outlined" title="Cancelar" onClick={handleCancel} />
        <Button
          title="Actualizar mantenimiento"
          onClick={handleFormSubmit}
          loading={isSubmitting}
        />
      </div>
    </div>
  );
};
