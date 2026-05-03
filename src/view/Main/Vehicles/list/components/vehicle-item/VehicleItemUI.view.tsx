import { Button } from "tomascomponents";
import type { IVehicleItemUI } from "./VehicleItemUI.hook";
import { PencilIcon, StarIcon, TrashIcon } from "lucide-react";

export const VehicleItemUIView = ({ vehicle, isFavorite, toggleFavorite, openModalDeleteVehicle, openModalUpdateVehicle }: IVehicleItemUI) => {
  const classNameFavoriteBorder = isFavorite ? "border-green-500" : "border-gray-200";
  return (
    <div className={`flex flex-col gap-2 border rounded-md p-2 ${classNameFavoriteBorder}`}>
      <div className="flex flex-row justify-between items-center gap-2">
        <span>{vehicle.marca}</span>
        <div className="flex flex-row gap-0.5">
          <Button
            variant="outlined"
            color="primary"
            title={<PencilIcon className="w-4 h-4" />}
            size="small"
            onClick={() => openModalUpdateVehicle(vehicle)}
          />
          <Button
            variant="outlined"
            color="danger"
            title={<TrashIcon className="w-4 h-4" />}
            size="small"
            onClick={() => openModalDeleteVehicle(vehicle.id)}
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
      <div className="grid grid-cols-2 gap-0.5">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="flex flex-col gap-0.5">
            <strong>Modelo:</strong>
            <span>{vehicle.modelo}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <strong>Año:</strong>
            <span>{vehicle.anio}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-0.5">
          <div className="flex flex-col gap-0.5">
            <strong>Color:</strong>
            <span>{vehicle.color}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <strong>Placa:</strong>
            <span>{vehicle.placa}</span>
          </div>
        </div>
      </div>
    </div>
  );
};