import { useEffect, useState } from "react";

export interface IUseHomeUI {
    tokenFcm: string | null;
}

export const useHomeUI = (): IUseHomeUI => {
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