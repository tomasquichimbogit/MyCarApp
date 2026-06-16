import type { ComponentType } from "react";
import { useFormContext } from "react-hook-form";
import { Wrench } from "lucide-react";
import { IconDiscBrake, IconOil, IconTireRotation } from "@/assets/svg";
import type { ICreateMaintenanceUI } from "../interface";

type MaintenanceTypeIconProps = {
  className?: string;
};

const MAINTENANCE_TYPE_OPTIONS: ReadonlyArray<{
  value: string;
  Icon?: ComponentType<MaintenanceTypeIconProps>;
}> = [
  { value: "Cambio de aceite", Icon: IconOil },
  { value: "Revisión de frenos", Icon: IconDiscBrake },
  { value: "Cambio de llantas", Icon: IconTireRotation },
  { value: "Revisión general" },
  { value: "Otro" },
];

const DEFAULT_MAINTENANCE_ICON = Wrench;
const maintenanceTypeIconClassName = "h-6 w-6 shrink-0 text-orange-rally";

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
        {MAINTENANCE_TYPE_OPTIONS.map(({ value, Icon }) => {
          const isSelected = selectedType === value;
          const TypeIcon = Icon ?? DEFAULT_MAINTENANCE_ICON;

          return (
            <button
              key={value}
              type="button"
              onClick={() =>
                setValue("maintenance_type", value, { shouldValidate: true })
              }
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                isSelected
                  ? "border border-helmet-blue/60 bg-helmet-blue/35"
                  : "border border-transparent hover:bg-white/5"
              }`}
            >
              <TypeIcon className={maintenanceTypeIconClassName} />
              <span className="text-sm font-medium text-white">{value}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
