import type { IVehicleItemUI } from "./VehicleItemUI.hook";
import { Button } from "tomascomponents";
export const VehicleItemUIView = ({
  vehicle,
  openModalEditVehicle,
  openModalConfirmDeleteVehicle,
  loading,
}: IVehicleItemUI) => {
  return (
    <div key={vehicle.id} className="flex flex-col gap-2">
      <div className="flex justify-end items-end">
        <div className="flex gap-4">
          <Button title="Editar" onClick={openModalEditVehicle} variant="outlined" color="primary" loading={loading} />
          <Button
            title="Eliminar"
            onClick={openModalConfirmDeleteVehicle}
            variant="outlined"
            color="danger"
            loading={loading}
          />
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-center items-center w-1/2 h-full">
          <img
            src="https://suzukiecuador.com/wp-content/uploads/2023/07/Jimny-blanco-1.jpg"
            alt="Imagen de ejemplo de vehículo"
            className="rounded shadow w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1 flex flex-row gap-2">
          <span>Marca: </span>
          <strong>{vehicle.marca}</strong>
        </div>
        <div className="col-span-1 flex flex-row gap-2">
          <span>Modelo: </span>
          <strong>{vehicle.modelo}</strong>
        </div>
        <div className="col-span-1 flex flex-row gap-2">
          <span>Año: </span>
          <strong>{vehicle.anio}</strong>
        </div>
        <div className="col-span-1 flex flex-row gap-2">
          <span>Color: </span>
          <strong>{vehicle.color}</strong>
        </div>
        <div className="col-span-1 flex flex-row gap-2">
          <span>Placa: </span>
          <strong>{vehicle.placa}</strong>
        </div>
      </div>
    </div>
  );
};
