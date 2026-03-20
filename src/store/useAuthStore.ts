
import { useAppNavigation } from "../hooks/useAppNavigation.hook";

export interface IAuthStore {
    getToken: () => string | null;
    logout: (nextPath?: string) => void;
}

export const useAuthStore = (): IAuthStore => {
    const { navigateTo } = useAppNavigation();

    const logout = (nextPath = "/login") => {
        localStorage.removeItem("token");
        localStorage.removeItem("fcm_token");
        navigateTo(nextPath, true);
    }

    const getToken = () => {
        return localStorage.getItem("token");
    }

    return {
        getToken,
        logout,
    }
}