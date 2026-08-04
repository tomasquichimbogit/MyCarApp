import { LOCAL_STORAGE_KEYS } from "@/constants";
import type { ISignInResponse } from "@/view/Security/Login/interface";
import { create } from "zustand";

export interface IAuthStore {
  user?: ISignInResponse;
  personId?: number;
  getToken: () => string | undefined;
  setUser: (user: ISignInResponse) => void;
  logout: () => void;
  setPersonId: (personId: number) => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  user: undefined,
  personId: undefined,
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
  setPersonId: (personId: number) => {
    set({ personId });
  },
}));
