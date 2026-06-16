import { useFormContext } from "react-hook-form";
import type { ICreateMaintenanceUI } from "../interface";

export const StepFiveUI = () => {
  const { setValue, watch } = useFormContext<ICreateMaintenanceUI>();
  const description = watch("description");

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-blue-bodywork p-4">
      <div className="flex flex-row items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-rally text-sm font-bold text-white">
          5
        </div>
        <h2 className="text-base font-bold text-white">Notas</h2>
      </div>

      <p className="text-sm text-desert-sand/70">
        Cuenta con tus palabras qué se hizo (opcional).
      </p>

      <textarea
        id="description"
        className="maintenance-step-input maintenance-step-textarea min-h-28 resize-y"
        placeholder="Ejemplo: Cambio de aceite y revisión de frenos."
        value={description ?? ""}
        onChange={(event) =>
          setValue("description", event.target.value, { shouldValidate: true })
        }
      />
    </div>
  );
};
