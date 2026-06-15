import { create } from "zustand";


export interface ICreateMaintenanceStore {
    showCreateMaintenance: boolean;
    setShowCreateMaintenance: (showCreateMaintenance: boolean) => void;
}


export const useCreateMaintenanceStore = create<ICreateMaintenanceStore>((set) => ({
    showCreateMaintenance: false,
    setShowCreateMaintenance: (showCreateMaintenance: boolean) => set({ showCreateMaintenance }),
}))


