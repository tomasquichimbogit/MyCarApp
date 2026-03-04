
import type { IVehicleItemUI } from "./VehicleItemUI.hook";

export const VehicleItemUIView = ({ vehicle }: IVehicleItemUI) => {
  return <div key={vehicle.id} className="flex flex-col gap-2">
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center w-1/2 h-full">
        <img
          src="https://suzukiecuador.com/wp-content/uploads/2023/07/Jimny-blanco-1.jpg"
          alt="Imagen de ejemplo de vehículo"
          className="rounded shadow w-full h-full object-cover"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div className="border-2 border-white rounded-lg p-2">
        <label>
          <strong>Marca: </strong> {vehicle.marca}
        </label>
      </div>
      <div className="border-2 border-white rounded-lg p-2">
        <label>
          <strong>Modelo: </strong> {vehicle.modelo}
        </label>
      </div>
      <div className="border-2 border-white rounded-lg p-2">
        <label>
          <strong>Año: </strong> {vehicle.anio}
        </label>
      </div>
      <div className="border-2 border-white rounded-lg p-2">
        <label>
          <strong>Color: </strong> {vehicle.color}
        </label>
      </div>
      <div className="border-2 border-white rounded-lg p-2">
        <label>
          <strong>Placa: </strong> {vehicle.placa}
        </label>
      </div>
    </div>
  </div>;
};