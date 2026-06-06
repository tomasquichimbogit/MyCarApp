import type { IVehicles } from "./intefaces"

export interface IUseVehiclesUIHook {
    vehicles: IVehicles[]
}


export const useVehiclesUIHook = (): IUseVehiclesUIHook => {
    return {
        vehicles: [
            {
                id: "1",
                brand: "Tesla",
                model: "Model 3",
                year: 2023,
                color: "Rojo",
                plate: "TES-001",
                status: "Activo",
                fuelType: "Eléctrico",
                mileage: 12300,
                nextMaintenance: "9 feb",
            }
        ],
    }
}