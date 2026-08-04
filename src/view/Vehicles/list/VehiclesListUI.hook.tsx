import { useVehicles } from "@/services/vehicles/vehicles.services";
import type { IVehicles } from "./intefaces";
import { useMemo } from "react";


export interface IUseVehiclesListUIHook {
    vehicles: IVehicles[];
    isLoading: boolean;
    isError: boolean;
}

export const useVehiclesListUIHook = (): IUseVehiclesListUIHook => {

    const { data: vehicles, isLoading, isError } = useVehicles();

    const dataVehicles = useMemo(() => vehicles || [], [vehicles]); 

    return {
        vehicles: dataVehicles,
        isLoading,
        isError,
    };
};