import { Button, FormInput, FormSelect } from "tomascomponents";
import type { IUseMaintenanceCreateUIHook } from "./MaintenanceCreateUI.hook";
import { CentralContainerUI } from "@/components/Render/CentralContainerUI";

export const MaintenanceCreateUIView = ({ handleCancel, control }: IUseMaintenanceCreateUIHook) => {
  return (
    <CentralContainerUI title="Nuevo Mantenimiento">
      <div className="flex flex-col gap-2 bg-white rounded-lg p-2">
        <form className="flex flex-col gap-0.5">
          <FormSelect
            label="Taller"
            name="workshop_id"
            placeholder="Selecciona un taller"
            options={[]}
            control={control}
          />
          <FormSelect
            label="Vehículo"
            name="vehicle_id"
            placeholder="Selecciona un vehículo"
            options={[]}
            control={control}
          />

          <FormInput
            label="Descripción"
            name="description"
            placeholder="Descripción del mantenimiento"
            control={control}
          />
        </form>
        <div className="flex flex-row gap-2 justify-end">
          <Button variant="outlined" title="Cancelar" onClick={handleCancel} />
          <Button title="Guardar" onClick={() => {}} />
        </div>
      </div>
    </CentralContainerUI>
  );
};
