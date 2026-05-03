import { Button } from "tomascomponents";
import { LoadingData } from "@/components/Render/LoadingData";
import type { IVehiclesListUI } from "./VehiclesListUI.hook";
import { VehicleItemUI } from "./components/vehicle-item/VehicleItemUI.controller";
import { Divider, Empty } from "antd";

export const VehiclesListUIView = ({
  vehicles,
  isLoadingVehicles,
  favoriteVehicles,
  openModalEditVehicle,
}: IVehiclesListUI) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end items-end">
        <Button variant="solid" color="primary" title="Agregar vehículo" onClick={openModalEditVehicle} />
      </div>
      {isLoadingVehicles && <LoadingData loading={isLoadingVehicles} message="Cargando vehículos..." />}
      {favoriteVehicles && (
        <div className="flex-1 justify-start items-start">
          <div>
            <strong>Vehículo favorito</strong>
          </div>
          <Divider className="my-2" />
          <VehicleItemUI vehicle={favoriteVehicles} />
        </div>
      )}
      <div>
        <Divider className="my-2" />
      </div>
      <strong>Otros vehículos</strong>
      {!isLoadingVehicles && vehicles.length > 0 && (
        <div className="flex flex-col gap-0.5 h-[40vh] overflow-y-auto border border-gray-300 rounded-md p-2">
          {vehicles.map((vehicle) => (
            <VehicleItemUI key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}

      {!isLoadingVehicles && vehicles.length === 0 && (
        <div>
          <Empty description="No hay más vehículos registrados" />
        </div>
      )}
    </div>
  );
};
