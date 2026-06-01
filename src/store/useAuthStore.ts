
import type { ISignInResponse } from "@/view/Security/Login/interface";
import { create } from "zustand";
export interface IAuthStore {
  token?: string;
  user?: ISignInResponse;
  getToken: () => string | undefined;
  setUser: (user: ISignInResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
    user: undefined,
    token: undefined,
    setUser: (user: ISignInResponse) => {
        set({ user });
    },
    getToken: () => {
        const user = get().user?.access_token;
        return user;
    },
    logout: () => {
        set({ user: undefined });
    }

})) 