import { Button } from "tomascomponents";
import type { IVehicleItemUI } from "./VehicleItemUI.hook";
import { PencilIcon, StarIcon, TrashIcon } from "lucide-react";

export const VehicleItemUIView = ({ vehicle, isFavorite, toggleFavorite }: IVehicleItemUI) => {
  return (
    <div className="flex flex-col gap-2 bg-gray-100 border border-gray-200 rounded-md p-2">
      <div className="flex flex-row justify-between items-center gap-2">
        <span>{vehicle.marca}</span>
        <div className="flex flex-row gap-0.5">
          <Button
            variant="outlined"
            color="primary"
            title={<PencilIcon className="w-4 h-4" />}
            size="small"
            onClick={() => {}}
          />
          <Button
            variant="outlined"
            color="danger"
            title={<TrashIcon className="w-4 h-4" />}
            size="small"
            onClick={() => {}}
          />
          <Button
            variant="outlined"
            color="primary"
            title={<StarIcon className="w-4 h-4" fill={isFavorite ? "yellow" : "none"} />}
            size="small"
            onClick={toggleFavorite}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
        <div className="flex flex-row gap-0.5">
          <strong>Modelo:</strong>
          <span>{vehicle.modelo}</span>
        </div>
        <div className="flex flex-row gap-0.5">
          <strong>Año:</strong>
          <span>{vehicle.anio}</span>
        </div>
        <div className="flex flex-row gap-0.5">
          <strong>Color:</strong>
          <span>{vehicle.color}</span>
        </div>
        <div className="flex flex-row gap-0.5">
          <strong>Placa:</strong>
          <span>{vehicle.placa}</span>
        </div>
      </div>
    </div>
  );
};
{
  /* 
    

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          <div className="flex flex-col gap-0.5">
            <strong>Modelo:</strong>
            <span>{vehicle.modelo}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <strong>Año:</strong>
            <span>{vehicle.anio}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          <div className="flex flex-col gap-0.5">
            <strong>Color:</strong>
            <span>{vehicle.color}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <strong>Placa:</strong>
            <span>{vehicle.placa}</span>
          </div>
        </div>
    
    
    */
}
