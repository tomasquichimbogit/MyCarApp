import { Button, Collapse } from "tomascomponents";
import type { IVehiclesUI } from "./VehicleslUI.hook";
import { PlusIcon } from "lucide-react";

export const VehiclesUIView = ({ itemsCollapse, openModalAddVehicle }: IVehiclesUI) => {
  return (
    <div className="flex flex-col gap-2 p-2 border-t-2 border-gray-200">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-md font-bold">Mis vehículos</h1>
        <Button variant="solid" color="primary" onClick={openModalAddVehicle} title={<div className="flex items-center gap-2"><PlusIcon className="w-4 h-4" /> Agregar vehículo</div>} />
      </div>
      <Collapse items={itemsCollapse} />
    </div>
  );
};