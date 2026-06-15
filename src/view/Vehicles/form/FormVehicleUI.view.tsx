import { Button, FormInput, FormNumberInput, FormSelect } from "tomascomponents";
import type { IUseFormVehicleUIHook } from "./FormVehicleUI.hook";
import { Alert } from "antd";
import { BucketName } from "@/constants";
import { vehiclesKeys } from "@/services/vehicles/vehiclesKeys";
import { StorageImageManagerUI } from "@/components/Render/StorageImageManagerUI.view";

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
  submitLabel,
  closeModal,
  isUpdateMode,
  vehicleImageItemKey,
  vehicleImageTitle,
}: IUseFormVehicleUIHook) => {
  // if (loadingResources) {
  //   return (
  //     <div className="flex justify-center py-8">
  //       <Spin spinning />
  //     </div>
  //   );
  // }

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
          disabled={isModelDisabled || loadingResources}
        />
        <FormNumberInput label="Año" name="year" placeholder="Año" control={control} required />
        <FormSelect
          label="Color"
          name="color"
          placeholder="Selecciona un color"
          control={control}
          options={colorsOptions}
        />
        <FormInput label="Placa" name="license_plate" placeholder="ABC-1234" control={control} required />
        {isUpdateMode && <strong>Imagen del vehículo</strong>}
        {isUpdateMode && (
          <StorageImageManagerUI
            itemKey={vehicleImageItemKey}
            bucketName={BucketName.VEHICLE_IMAGES}
            modalTitle={vehicleImageTitle}
            imageAlt="Imagen del vehículo"
            wrapperClassName="relative w-full h-full min-h-[150px] pt-0.5 pb-0.5"
            invalidateQueryKey={vehiclesKeys.list()}
          />
        )}
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <Button title="Cancelar" onClick={closeModal} variant="outlined" />
        <Button title={submitLabel} onClick={handleFormSubmit} loading={isSubmitting || loadingResources} />
      </div>
    </div>
  );
};
