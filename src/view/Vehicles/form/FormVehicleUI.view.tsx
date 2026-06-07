import { Button, FormInput, FormNumberInput, FormSelect } from "tomascomponents";
import type { IUseFormVehicleUIHook } from "./FormVehicleUI.hook";
import { Alert, Spin } from "antd";

export const FormVehicleUIView = ({
  control,
  brandsOptions,
  modelsOptions,
  colorsOptions,
  loadingResources,
  errorResources,
  missingProfile,
  isSubmitting,
  isModelDisabled,
  handleFormSubmit,
}: IUseFormVehicleUIHook) => {
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
    <div className="flex flex-col gap-3 p-1">
      <FormSelect
        label="Marca"
        name="brand"
        placeholder="Selecciona una marca"
        control={control}
        options={brandsOptions}
      />
      <FormSelect
        label="Modelo"
        name="model"
        placeholder="Selecciona un modelo"
        control={control}
        options={modelsOptions}
        disabled={isModelDisabled}
      />
      <FormNumberInput
        label="Año"
        name="year"
        placeholder="Año"
        control={control}
        required
      />
      <FormSelect
        label="Color"
        name="color"
        placeholder="Selecciona un color"
        control={control}
        options={colorsOptions}
      />
      <FormInput
        label="Placa"
        name="license_plate"
        placeholder="ABC-1234"
        control={control}
        required
      />
      <Button
        title="Guardar vehículo"
        onClick={handleFormSubmit}
        loading={isSubmitting}
      />
    </div>
  );
};
