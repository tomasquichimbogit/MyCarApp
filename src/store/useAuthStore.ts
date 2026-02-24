
import { useState } from "react";

export interface IAuthStore {
    isAuthenticated: boolean;
}

export const useAuthStore =  (): IAuthStore => {

    const [isAuthenticated] = useState<boolean>(() => {
        const token = localStorage.getItem("token");
        return token !== null && token.trim() !== "";
    });

    return {
        isAuthenticated,
    }
}