
export interface IAuthStore {
    getToken: () => string | null;
    logout: () => void;
}

export const useAuthStore = (): IAuthStore => {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    const getToken = () => {
        return localStorage.getItem("token");
    }

    return {
        getToken,
        logout,
    }
}

// import { create } from "zustand";

// export interface IAuthStore {
//     isAuthenticated: boolean;
//     setIsAuthenticated: (isAuthenticated: boolean) => void;
//     getToken: () => string | null;
//     setToken: (token: string) => void;
// }

// export const useAuthStore = create<IAuthStore>((set) => ({
//     isAuthenticated: false,
//     setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
//     getToken: () => {
//         const token = localStorage.getItem("token");
//         return token !== null && token.trim() !== "";
//     },
//     setToken: (token: string) => {
//         localStorage.setItem("token", token);
//     },
// }));
