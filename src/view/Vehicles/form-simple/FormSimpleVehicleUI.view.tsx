import { Button, FormInput } from "tomascomponents";
import type { IUseFormSimpleVehicleUIHook } from "./FormSimpleVehicleUI.hook";
import { Alert, Spin } from "antd";

export const FormSimpleVehicleUIView = ({
  control,
  loadingResources,
  errorResources,
  missingProfile,
  isSubmitting,
  handleFormSubmit,
  submitLabel,
  closeModal,
}: IUseFormSimpleVehicleUIHook) => {
  if (loadingResources) {
    return (
      <div className="flex justify-center py-8">
        <Spin spinning />
      </div>
    );
  }

  if (errorResources) {
    return (
      <Alert
        message="Error"
        description={
          missingProfile
            ? "Primero debes completar tu información personal en Mi información."
            : "No se pudieron cargar los datos del formulario. Intenta de nuevo."
        }
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 p-2 max-h-[440px] overflow-y-auto">
        <FormInput label="Placa" name="license_plate" placeholder="ABC-1234" control={control} required />
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <Button title="Cancelar" onClick={closeModal} variant="outlined" />
        <Button title={submitLabel} onClick={handleFormSubmit} loading={isSubmitting} />
      </div>
    </div>
  );
};
