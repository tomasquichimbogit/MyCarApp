import { useEffect, useMemo, useState } from "react";
import { useVehiclesQuery, type VehicleRecord } from "../../../services/vehiculo.service";

export interface IHomeUI {
    tokenFcm: string | null;
    vehicles: VehicleRecord[];
}

export const useHomeUI = (): IHomeUI => {
    const [tokenFcm, setTokenFcm] = useState<string | null>(null);
    const { data: vehicles } = useVehiclesQuery();
    useEffect(() => {
        const token = localStorage.getItem("fcm_token");
        if (token) {
            setTokenFcm(token);
        }
    }, []); 

    const normalizedVehicles = useMemo(() => {
        return vehicles ?? [];
    }, [vehicles]);

    return {
        tokenFcm,
        vehicles: normalizedVehicles,
    }
}