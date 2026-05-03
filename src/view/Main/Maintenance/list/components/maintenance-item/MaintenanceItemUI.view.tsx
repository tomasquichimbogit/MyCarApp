import { Button } from "tomascomponents";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { IMaintenanceItemUI } from "./MaintenanceItemUI.hook";

export const MaintenanceItemUIView = ({
  maintenance,
  openModalDeleteMaintenance,
  openModalUpdateMaintenance,
}: IMaintenanceItemUI) => {
  const vehLabel = maintenance.vehiculo
    ? `${maintenance.vehiculo.placa} · ${maintenance.vehiculo.marca} ${maintenance.vehiculo.modelo}`
    : "Vehículo";
  const tallerNombre = maintenance.taller?.nombre ?? "Taller";
  const fecha = new Date(maintenance.fecha_servicio).toLocaleString();
  const costo = typeof maintenance.costo === "number" ? maintenance.costo : Number(maintenance.costo);

  return (
    <div className="flex flex-col gap-2 border rounded-md p-2 border-gray-200">
      <div className="flex flex-row justify-between items-center gap-2">
        <span className="font-medium">{fecha}</span>
        <div className="flex flex-row gap-0.5 shrink-0">
          <Button
            variant="outlined"
            color="primary"
            title={<PencilIcon className="w-4 h-4" />}
            size="small"
            onClick={() => openModalUpdateMaintenance(maintenance)}
          />
          <Button
            variant="outlined"
            color="danger"
            title={<TrashIcon className="w-4 h-4" />}
            size="small"
            onClick={() => openModalDeleteMaintenance(maintenance.id)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
        <div className="flex flex-col gap-0.5">
          <strong>Vehículo:</strong>
          <span>{vehLabel}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <strong>Taller:</strong>
          <span>{tallerNombre}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <strong>Costo:</strong>
          <span>
            {Number.isFinite(costo)
              ? costo.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
              : String(maintenance.costo)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 md:col-span-2">
          <strong>Servicio:</strong>
          <span>{maintenance.descripcion_servicio}</span>
        </div>
      </div>
    </div>
  );
};
