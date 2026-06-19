import type { ETypeVehicle } from "@/enums";

export interface IVehicles {
    id: string
    brand: string
    model: string
    year: number
    color: string
    plate: string
    type?: ETypeVehicle
    imageUrl?: string
    status?: string
    fuelType?: string
    mileage?: number
    nextMaintenance?: string
}