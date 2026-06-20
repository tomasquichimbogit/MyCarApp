import { ItemLabelSelectVehicle } from "@/components/Render/ItemLabelSelectVehicle";
import { useVehicles } from "@/services/vehicles/vehicles.services";
import { Select } from "antd";
import { useMemo } from "react";
import { maintenanceSelectAppearance } from "../../create/components/maintenanceSelectAppearance";

interface IItemSelectVehicleUIProps {
    value?: number;
    setValue: (value: number) => void;
}

export const ItemSelectVehicleUI = ({ value, setValue }: IItemSelectVehicleUIProps) => {

    const {
        data: vehicles = [],
        isLoading: isLoadingVehicles,
        isError: isErrorVehicles,
    } = useVehicles();  

    const normalizedVehicles = useMemo(
        () =>
            vehicles.map((vehicle) => ({
                label: ItemLabelSelectVehicle(vehicle),
                value: Number(vehicle.id),
                searchText: `${vehicle.brand} ${vehicle.model} ${vehicle.plate}`.toLowerCase(),
            })),
        [vehicles],
    );

    const filterOption = (input: string, option?: { searchText?: string }) =>
        (option?.searchText ?? "").includes(input.trim().toLowerCase());

    return (
        <div className="flex flex-col gap-2 rounded-2xl bg-blue-bodywork p-4">
            <p className="m-0 text-xs md:text-sm text-desert-sand/70">
                Selecciona la moto o el carro al que le hiciste el servicio.
            </p>
            <Select
                className="maintenance-vehicle-select w-full"
                options={normalizedVehicles}
                placeholder="Toca aquí para elegir un vehículo"
                loading={isLoadingVehicles}
                value={value}
                onChange={(value) => setValue(value)}
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