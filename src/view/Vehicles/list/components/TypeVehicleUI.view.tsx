import { IconCarSuv, IconMotorcycle } from "@/assets/svg";
import { ETypeVehicle } from "@/enums";

export interface ITypeVehicleUIProps {
  openModal: (type: ETypeVehicle) => void;
}

export const TypeVehicleUI = ({ openModal }: ITypeVehicleUIProps) => {
  return (
    <div className="flex flex-row gap-16 min-h-0 h-full justify-center items-center">
      <div className="flex flex-row items-center justify-center">
        <button type="button" className="cursor-pointer border border-led-yellow hover:bg-led-yellow/10 text-white px-4 py-2 rounded-lg" onClick={() => openModal(ETypeVehicle.CAR)}>
          <div className="flex flex-col items-center justify-center gap-2">
            <IconCarSuv className="w-10 h-10 text-led-yellow" transform="scale(-1, 1)" />
            Automóvil
          </div>
        </button>
      </div>
      <div className="flex flex-row items-center justify-center">
        <button type="button" className="cursor-pointer border border-led-yellow hover:bg-led-yellow/10 text-white px-4 py-2 rounded-lg" onClick={() => openModal(ETypeVehicle.MOTORCYCLE)}>
          <div className="flex flex-col items-center justify-center gap-2">
            <IconMotorcycle className="w-10 h-10 text-led-yellow" transform="scale(-1, 1)" />
            Motocicleta
          </div>
        </button>
      </div>
    </div>
  );
};