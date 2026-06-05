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
            },
            {
                id: "2",
                brand: "Toyota",
                model: "Corolla",
                year: 2024,
                color: "Azul",
                plate: "TOY-002",
                status: "Activo",
                fuelType: "Gasolina",
                mileage: 10000,
                nextMaintenance: "10 mar",
            }
        ],
    }
}