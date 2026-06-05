import type { IMaintenance } from "./interfaces"

export interface IUseMaintenanceUIHook {
    maintenances: IMaintenance[]
}

export const useMaintenanceUIHook = (): IUseMaintenanceUIHook => {
    return {
        maintenances: [],
    }
}
