import { IconCarSuv } from "@/assets/svg";
import type { IVehicles } from "@/view/Vehicles/list/intefaces";

export const ItemLabelSelectVehicle = (vehicle: IVehicles) => {
    return (
                <div className="flex flex-row gap-0.5 items-center">
                    <div>
                        <IconCarSuv className="w-10 h-10 text-orange-rally" transform="scale(-1, 1)" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <strong className="text-sm text-orange-rally">{vehicle.brand} - {vehicle.model}</strong>
                        <div className="flex flex-row gap-4">
                            <strong className="text-sm text-desert-sand">Placa:</strong>
                            <strong className="text-sm text-emerald-700">{vehicle.plate}</strong>
                        </div>
                    </div>
                </div>
           
    );
};