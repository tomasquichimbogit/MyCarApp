
import { create } from "zustand";
export interface IAuthStore {
    token: string | null;
    setToken: (token: string) => void;
    removeToken: () => void;
    getToken: () => string | null;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
    token: localStorage.getItem("token"),
    setToken: (token: string) => {
        localStorage.setItem("token", token);
        set({ token });
    },
    removeToken: () => {
        localStorage.removeItem("token");
        set({ token: null });
    },
    getToken: () => {
        return get().token ?? localStorage.getItem("token");
    },
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("fcm_token");
        set({ token: null });
    }
})) 