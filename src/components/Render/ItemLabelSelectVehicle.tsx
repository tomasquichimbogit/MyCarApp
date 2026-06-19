import { IconCarSuv, IconMotorcycle } from "@/assets/svg";
import { ETypeVehicle } from "@/enums";
import type { IVehicles } from "@/view/Vehicles/list/intefaces";

export const ItemLabelSelectVehicle = (vehicle: IVehicles) => {
    const isMotorcycle = vehicle.type === ETypeVehicle.MOTORCYCLE;
    const VehicleTypeIcon = isMotorcycle ? IconMotorcycle : IconCarSuv;

    return (
                <div className="flex flex-row gap-0.5 items-center">
                    <div>
                        <VehicleTypeIcon className="w-10 h-10 text-orange-rally" transform={isMotorcycle ? undefined : "scale(-1, 1)"} />
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