import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import type { IUseVehiclesUIHook } from "./VehiclesUI.hook";
import { ItemVehicleUI } from "./components/ItemVehicleUI.view";
import { Empty } from "antd";

export const VehiclesUIView = ({ vehicles, isLoading, handleAddClick, isError }: IUseVehiclesUIHook) => {
  return (
    <CentralContainerUI title="Mis vehículos" onAddClick={handleAddClick} addButtonTitle="Agregar vehículo">
      <div className="flex w-full flex-col gap-2 pt-2">
        {isLoading && (
          <p className="rounded-xl border border-desert-sand/40 bg-white px-4 py-6 text-center text-sm text-gray-500">
            Cargando vehículos...
          </p>
        )}
        {isError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-600">
            No se pudieron cargar los vehículos. Intenta de nuevo más tarde.
          </p>
        )}
        {!isLoading && !isError && vehicles.length === 0 && (
          <Empty description={<span className="text-white">No hay vehículos registrados</span>} />
        )}
        {vehicles.map((vehicle) => (
          <ItemVehicleUI key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </CentralContainerUI>
  );
};
