import { useFormContext } from "react-hook-form";
import type { ICreateMaintenanceUI } from "../interface";

export const StepFourUI = () => {
  const { setValue, watch } = useFormContext<ICreateMaintenanceUI>();
  const maintenanceDate = watch("maintenance_date");
  const mileage = watch("mileage");
  const cost = watch("cost");

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-blue-bodywork p-4">
      <div className="flex flex-row items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-rally text-sm font-bold text-white">
          4
        </div>
        <h2 className="text-base font-bold text-white">Detalles</h2>
      </div>

      <p className="text-sm text-desert-sand/70">
        Cuándo se hizo, los kilómetros y cuánto costó.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="maintenance_date" className="maintenance-step-field-label">
            Fecha
          </label>
          <input
            id="maintenance_date"
            type="date"
            className="maintenance-step-input"
            value={maintenanceDate ?? ""}
            onChange={(event) =>
              setValue("maintenance_date", event.target.value, {
                shouldValidate: true,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="mileage" className="maintenance-step-field-label">
            Kilometraje
          </label>
          <div className="relative">
            <input
              id="mileage"
              type="number"
              min={0}
              className="maintenance-step-input pr-10"
              placeholder="Ej: 25000"
              value={mileage || ""}
              onChange={(event) =>
                setValue("mileage", Number(event.target.value) || 0, {
                  shouldValidate: true,
                })
              }
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-desert-sand">
              km
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cost" className="maintenance-step-field-label">
            Costo
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-desert-sand">
              $
            </span>
            <input
              id="cost"
              type="number"
              min={0}
              className="maintenance-step-input pl-7"
              placeholder="Ej: 80000"
              value={cost || ""}
              onChange={(event) =>
                setValue("cost", Number(event.target.value) || 0, {
                  shouldValidate: true,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
