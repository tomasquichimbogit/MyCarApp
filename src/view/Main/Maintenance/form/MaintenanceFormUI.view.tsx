import { FormInput, FormNumberInput, FormSelect } from "tomascomponents";
import type { IMaintenanceFormUI } from "./MaintenanceFormUI.hook";

export const MaintenanceFormUIView = ({
  control,
  vehicleOptions,
  workshopOptions,
}: IMaintenanceFormUI) => {
  return (
    <>
      <FormSelect label="Vehículo" name="vehiculo_id" placeholder="Selecciona vehículo" control={control} options={vehicleOptions} />
      <FormSelect label="Taller" name="taller_id" placeholder="Selecciona taller" control={control} options={workshopOptions} />
      <FormInput
        label="Descripción del servicio"
        name="descripcion_servicio"
        placeholder="Descripción"
        control={control}
        minLength={1}
        maxLength={500}
      />
      <FormNumberInput label="Costo" name="costo" placeholder="Costo" control={control} />
      <FormInput
        label="Fecha del servicio"
        name="fecha_servicio"
        placeholder="Ej: fecha y hora local (YYYY-MM-DDTHH:mm)"
        control={control}
      />
    </>
  );
};
