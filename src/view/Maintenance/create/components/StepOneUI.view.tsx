import { useFormContext } from "react-hook-form";
import { useVehicles } from "@/services/vehicles/vehicles.services";
import { Select } from "antd";
import { useMemo } from "react";
import type { ICreateMaintenanceUI } from "../interface";
import type { IVehicles } from "@/view/Vehicles/list/intefaces";
import { IconCarSuv } from "@/assets/svg";
import { maintenanceSelectAppearance } from "./maintenanceSelectAppearance";


export const StepOneUI = () => {

    
    const {
        data: vehicles = [],
        isLoading: isLoadingVehicles,
        isError: isErrorVehicles,
    } = useVehicles();

    const { setValue, watch } = useFormContext<ICreateMaintenanceUI>();
    const selectedVehicleId = watch("vehicle_id");

    const renderLabel = (vehicle: IVehicles) => {
        return (
            <div className="flex flex-row gap-0.5 items-center">
                <div>
                    <IconCarSuv className="w-10 h-10 text-orange-rally" transform="scale(-1, 1)" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <strong className="text-sm text-orange-rally">{vehicle.brand} - {vehicle.model}</strong>
                    <div className="flex flex-row gap-4">
                        <strong className="text-sm text-desert-sand">Placa:</strong>
                        <strong className="text-sm text-emerald-700">{vehicle.plate}</strong>
                    </div>
                </div>
            </div>
        );
    };

    const normalizedVehicles = useMemo(
        () =>
            vehicles.map((vehicle) => ({
                label: renderLabel(vehicle),
                value: Number(vehicle.id),
                searchText: `${vehicle.brand} ${vehicle.model} ${vehicle.plate}`.toLowerCase(),
            })),
        [vehicles],
    );

    const filterOption = (input: string, option?: { searchText?: string }) =>
        (option?.searchText ?? "").includes(input.trim().toLowerCase());

    return (
        <div className="flex flex-col gap-3 rounded-2xl bg-blue-bodywork p-4">
            <div className="flex flex-row items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-rally text-sm font-bold text-white">
                    1
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                    <h2 className="m-0 text-base font-bold leading-tight text-white">¿Qué vehículo?</h2>
                    <p className="m-0 text-sm text-desert-sand/70">
                        Selecciona la moto o el carro al que le hiciste el servicio.
                    </p>
                </div>
            </div>

            <Select
                className="maintenance-vehicle-select w-full"
                options={normalizedVehicles}
                placeholder="Toca aquí para elegir un vehículo"
                loading={isLoadingVehicles}
                value={selectedVehicleId || undefined}
                onChange={(value) => setValue("vehicle_id", Number(value))}
                disabled={isErrorVehicles}
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