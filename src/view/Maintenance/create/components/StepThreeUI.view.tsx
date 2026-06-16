import { useFormContext } from "react-hook-form";
import { Wrench } from "lucide-react";
import type { ICreateMaintenanceUI } from "../interface";

const MAINTENANCE_TYPES = [
  "Cambio de aceite",
  "Revisión de frenos",
  "Cambio de llantas",
  "Revisión general",
  "Otro",
] as const;

export const StepThreeUI = () => {
  const { setValue, watch } = useFormContext<ICreateMaintenanceUI>();
  const selectedType = watch("maintenance_type");

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-blue-bodywork p-4">
      <div className="flex flex-row items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-rally text-sm font-bold text-white">
          3
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="m-0 text-base font-bold leading-tight text-white">¿Qué le hicieron?</h2>
          <p className="m-0 text-sm text-desert-sand/70">
            Toca el tipo de mantenimiento.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {MAINTENANCE_TYPES.map((type) => {
          const isSelected = selectedType === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() =>
                setValue("maintenance_type", type, { shouldValidate: true })
              }
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                isSelected
                  ? "border border-helmet-blue/60 bg-helmet-blue/35"
                  : "border border-transparent hover:bg-white/5"
              }`}
            >
              <Wrench className="h-4 w-4 shrink-0 text-orange-rally" />
              <span className="text-sm font-medium text-white">{type}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
