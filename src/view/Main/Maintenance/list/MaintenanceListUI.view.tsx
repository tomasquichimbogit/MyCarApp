import { Button, Select } from "tomascomponents";
import { Empty } from "antd";
import { LoadingData } from "@/components/Render/LoadingData";
import type { IMaintenanceListUI } from "./MaintenanceListUI.hook";
import { MaintenanceItemUI } from "./components/maintenance-item/MaintenanceItemUI.controller";

export const MaintenanceListUIView = ({
  maintenances,
  isLoadingMaintenance,
  openModalCreateMaintenance,
  selectedVehicleId,
  vehiclesOptions,
  workshopsOptions,
  handleSelectVehicle,
  handleSelectWorkshop,
  selectedWorkshopId,
}: IMaintenanceListUI) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end items-end">
        <Button variant="solid" color="primary" title="Agregar mantenimiento" onClick={openModalCreateMaintenance} />
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex flex-col gap-0.5">
          <div className="font-bold flex flex-row justify-between">
            Vehículo
            <small className="text-gray-500"> (Por defecto el vehículo favorito)</small>
          </div>
          <Select
            className="w-full"
            placeholder="Selecciona vehículo"
            options={vehiclesOptions}
            value={selectedVehicleId}
            onChange={(value) => handleSelectVehicle(value)}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="font-bold flex flex-row justify-between">
            Taller
          </div>
          <Select
            className="w-full"
            placeholder="Selecciona taller"
            options={workshopsOptions}
            value={selectedWorkshopId}
            onChange={(value) => handleSelectWorkshop(value ?? undefined)}
            allowClear
          />
        </div>
      </div>
      {isLoadingMaintenance && <LoadingData loading={isLoadingMaintenance} message="Cargando mantenimientos..." />}

      {!isLoadingMaintenance && maintenances.length > 0 && (
        <div className="flex flex-col gap-0.5 h-[55vh] overflow-y-auto border border-gray-300 rounded-md p-2">
          {maintenances.map((maintenance) => (
            <MaintenanceItemUI key={maintenance.id} maintenance={maintenance} />
          ))}
        </div>
      )}

      {!isLoadingMaintenance && maintenances.length === 0 && (
        <div>
          <Empty description="No hay mantenimientos registrados" />
        </div>
      )}
    </div>
  );
};
