import { create } from "zustand";

export interface ISidebarStore {
    open: boolean;
    toggleOpen: () => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => ({
    open: false,
    toggleOpen: () => set((state) => ({ open: !state.open })),
}));