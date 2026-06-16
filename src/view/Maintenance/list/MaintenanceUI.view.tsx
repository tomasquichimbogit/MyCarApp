import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import { Empty } from "antd";
import type { IUseMaintenanceUIHook } from "./MaintenanceUI.hook";

export const MaintenanceUIView = ({
  handleAddNewMaintenance,
  maintenances,
  isLoading,
  isError,
}: IUseMaintenanceUIHook) => {
  return (
    <CentralContainerUI
      title="Mantenimientos"
      onAddClick={handleAddNewMaintenance}
      addButtonTitle="Nuevo"
    >
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
            description={
              <span className="text-white">No hay mantenimientos registrados</span>
            }
          />
        )}

        {maintenances.map((maintenance) => (
          <article
            key={maintenance.id}
            className="rounded-xl border border-desert-sand/40 bg-white p-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {maintenance.vehiclePlate}
                </h3>
                <p className="text-sm text-gray-500">
                  {maintenance.maintenanceType}
                  {maintenance.workshopName ? ` - ${maintenance.workshopName}` : ""}
                </p>
              </div>
              <span className="text-sm font-semibold text-orange-rally">
                ${maintenance.cost}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {maintenance.description}
            </p>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>{maintenance.date}</span>
              <span>{maintenance.mileage} km</span>
            </div>
          </article>
        ))}
      </div>
    </CentralContainerUI>
  );
};
