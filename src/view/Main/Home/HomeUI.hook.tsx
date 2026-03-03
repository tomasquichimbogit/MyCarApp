import { useEffect, useState } from "react";
import { useVehiclesQuery } from "../../../services/vehiculo.service";

export interface IHomeUI {
    tokenFcm: string | null;
}

export const useHomeUI = (): IHomeUI => {
    const [tokenFcm, setTokenFcm] = useState<string | null>(null);
    const { data: vehicles } = useVehiclesQuery();
    console.log('vehicles =>',vehicles);
    useEffect(() => {
        const token = localStorage.getItem("fcm_token");
        if (token) {
            setTokenFcm(token);
        }
    }, []); 
    return {
        tokenFcm,
    }
}