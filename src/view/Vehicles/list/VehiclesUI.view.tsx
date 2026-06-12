import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import type { IUseVehiclesUIHook } from "./VehiclesUI.hook";
import { ItemVehicleUI } from "./components/ItemVehicleUI.view";
import { Empty } from "antd";
import { Input } from "tomascomponents";

export const VehiclesUIView = ({ vehicles, isLoading, handleAddClick, isError, search, handleSearchChange }: IUseVehiclesUIHook) => {
  return (
    <CentralContainerUI title="Mis vehículos" onAddClick={handleAddClick} addButtonTitle="Agregar vehículo">
      {(vehicles.length > 0 || (search && search.length > 0)) && (
        <div className="flex flex-col gap-2">
          <Input placeholder="Buscar vehículo" value={search} onChange={handleSearchChange} allowClear />
        </div>
      )}
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

        <div className="flex flex-col gap-2 max-h-[calc(100dvh-164px)] overflow-y-auto">
          {vehicles.map((vehicle) => (
            <ItemVehicleUI key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </CentralContainerUI>
  );
};
