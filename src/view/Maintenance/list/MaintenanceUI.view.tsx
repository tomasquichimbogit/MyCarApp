import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import { Empty } from "antd";
import type { IUseMaintenanceUIHook } from "./MaintenanceUI.hook";
import { ItemSelectVehicleUI } from "./components/ItemSelectVehicleUI.view";
import { IconCarSuv } from "@/assets/svg";
import { ItemListMaintenanceUIView } from "./components/ItemListMaintenanceUI.view";
import { Input } from "tomascomponents";

export const MaintenanceUIView = ({
  handleAddNewMaintenance,
  maintenances,
  isLoading,
  isError,
  selectedVehicleId,
  setSelectedVehicleId,
  handleDeleteMaintenance,
  isDeletingMaintenance,
  search,
  handleSearchChange,
  showInputSearch,
}: IUseMaintenanceUIHook) => {
  return (
    <CentralContainerUI
      title="Listado de mantenimientos"
      onAddClick={handleAddNewMaintenance}
      addButtonTitle="Nuevo"
      returnTo="list"
    >
      <div className="flex flex-col gap-1">
        <div>
          <ItemSelectVehicleUI value={selectedVehicleId} setValue={setSelectedVehicleId} />
        </div>
        {showInputSearch && (
          <div className="flex flex-col gap-0.5">
            <small>Buscar mantenimiento</small>
            <Input placeholder="Buscar mantenimiento" value={search} onChange={handleSearchChange} allowClear />
          </div>
        )}
        {!selectedVehicleId && (
          <div className="flex flex-col gap-2 justify-center items-center border border-desert-sand/40 p-3 rounded-2xl">
            <IconCarSuv className="w-10 h-10 text-orange-rally" transform="scale(-1, 1)" />
            <p className="text-sm text-orange-rally">Selecciona un vehículo para ver sus mantenimientos.</p>
          </div>
        )}
        {selectedVehicleId && (
          <div className="flex w-full flex-col gap-2">
            {isLoading && (
              <p className="rounded-xl border border-desert-sand/40 bg-white px-4 py-6 text-center text-sm text-gray-500">
                Cargando mantenimientos...
              </p>
            )}

            {isError && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-600">
                No se pudieron cargar los mantenimientos. Intenta de nuevo más tarde.
              </p>
            )}

            {!isLoading && !isError && maintenances.length === 0 && (
              <Empty
                description={<span className="text-white">
                  {search.length > 0 ? "No se encontraron mantenimientos para la búsqueda." : "No hay mantenimientos registrados para este vehículo."}
                  </span>}
              />
            )}

            <div className="h-[calc(100dvh-260px)] md:h-[calc(100dvh-270px)] overflow-y-auto">
              {maintenances.map((maintenance) => (
                <ItemListMaintenanceUIView
                  key={maintenance.id}
                  maintenance={maintenance}
                  onDelete={handleDeleteMaintenance}
                  isDeleting={isDeletingMaintenance}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </CentralContainerUI>
  );
};
