import { useEffect, useState } from "react";

export interface IHomeUI {
    tokenFcm: string | null;
}

export const useHomeUI = (): IHomeUI => {
    const [tokenFcm, setTokenFcm] = useState<string | null>(null);
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