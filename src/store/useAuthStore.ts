import { LOCAL_STORAGE_KEYS } from "@/constants";
import type { ISignInResponse } from "@/view/Security/Login/interface";
import { create } from "zustand";

export interface IAuthStore {
  user?: ISignInResponse;
  getToken: () => string | undefined;
  setUser: (user: ISignInResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  user: undefined,
  setUser: (user: ISignInResponse) => {
    set({ user });
  },
  getToken: () => {
    return get().user?.session.access_token;
  },
  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    set({ user: undefined });
  },
}));
