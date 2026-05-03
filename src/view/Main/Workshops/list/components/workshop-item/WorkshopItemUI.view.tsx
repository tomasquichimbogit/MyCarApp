import { Button } from "tomascomponents";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { IWorkshopItemUI } from "./WorkshopItemUI.hook";

export const WorkshopItemUIView = ({
  workshop,
  openModalDeleteWorkshop,
  openModalUpdateWorkshop,
}: IWorkshopItemUI) => {
  return (
    <div className="flex flex-col gap-2 border rounded-md p-2 border-gray-200">
      <div className="flex flex-row justify-between items-center gap-2">
        <span>{workshop.nombre}</span>
        <div className="flex flex-row gap-0.5">
          <Button
            variant="outlined"
            color="primary"
            title={<PencilIcon className="w-4 h-4" />}
            size="small"
            onClick={() => openModalUpdateWorkshop(workshop)}
          />
          <Button
            variant="outlined"
            color="danger"
            title={<TrashIcon className="w-4 h-4" />}
            size="small"
            onClick={() => openModalDeleteWorkshop(workshop.id)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        <div className="flex flex-col gap-0.5">
          <strong>Dirección:</strong>
          <span>{workshop.direccion}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <strong>Teléfono:</strong>
          <span>{workshop.telefono}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <strong>Especialidad:</strong>
          <span>{workshop.especialidad}</span>
        </div>
      </div>
    </div>
  );
};
