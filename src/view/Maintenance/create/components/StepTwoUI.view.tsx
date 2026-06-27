import { useFormContext } from "react-hook-form";
import { useWorkshops } from "@/services/workshops/workshops.services";
import { Select } from "antd";
import { MapPin, Wrench } from "lucide-react";
import { useMemo } from "react";
import type { ICreateMaintenanceUI } from "../interface";
import type { IWorkshop } from "@/view/Workshops/list/interfaces";
import { maintenanceSelectAppearance } from "./maintenanceSelectAppearance";

export const StepTwoUI = () => {
  const {
    data: workshops = [],
    isLoading: isLoadingWorkshops,
    isError: isErrorWorkshops,
  } = useWorkshops();

  const { setValue, watch } = useFormContext<ICreateMaintenanceUI>();
  const selectedWorkshopId = watch("workshop_id");

  const renderLabel = (workshop: IWorkshop) => {
    const location = [workshop.city, workshop.state].filter(Boolean).join(", ");

    return (
      <div className="flex flex-row items-center gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-rally/10">
          <Wrench className="h-5 w-5 text-orange-rally" />
        </div>
        <div className="flex flex-col gap-0.5">
          <strong className="text-sm text-orange-rally">{workshop.name}</strong>
          {(workshop.address || location) && (
            <div className="flex flex-row items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-desert-sand" />
              <strong className="text-sm text-desert-sand">
                {workshop.address}
                {workshop.address && location ? ", " : ""}
                {location}
              </strong>
            </div>
          )}
        </div>
      </div>
    );
  };

  const normalizedWorkshops = useMemo(
    () =>
      workshops.map((workshop) => ({
        label: renderLabel(workshop),
        value: workshop.id,
        searchText: [
          workshop.name,
          workshop.address,
          workshop.city,
          workshop.state,
          workshop.country,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      })),
    [workshops],
  );

  const filterOption = (input: string, option?: { searchText?: string }) =>
    (option?.searchText ?? "").includes(input.trim().toLowerCase());

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-blue-bodywork p-4">
      <div className="flex flex-row items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-rally text-sm font-bold text-white">
          2
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="m-0 text-base font-bold leading-tight text-white">¿Qué taller?</h2>
          <p className="m-0 text-sm text-desert-sand/70">
            Selecciona el taller donde realizaste el mantenimiento.
          </p>
        </div>
      </div>

      <Select
        className="maintenance-vehicle-select w-full"
        options={normalizedWorkshops}
        placeholder="Toca aquí para elegir un taller"
        loading={isLoadingWorkshops}
        value={selectedWorkshopId || undefined}
        onChange={(value) => setValue("workshop_id", Number(value))}
        disabled={isErrorWorkshops}
        allowClear
        showSearch={{
          optionFilterProp: "searchText",
          filterOption,
        }}
        {...maintenanceSelectAppearance}
      />
    </div>
  );
};
