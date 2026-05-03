import { Button } from "tomascomponents";
import { Empty } from "antd";
import { LoadingData } from "@/components/Render/LoadingData";
import type { IWorkhopsListUI } from "./WorkhopsList.hook";
import { WorkshopItemUI } from "./components/workshop-item/WorkshopItemUI.controller";

export const WorkhopsListUIView = ({
  workshops,
  isLoadingWorkshops,
  openModalCreateWorkshop,
}: IWorkhopsListUI) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end items-end">
        <Button variant="solid" color="primary" title="Agregar taller" onClick={openModalCreateWorkshop} />
      </div>

      {isLoadingWorkshops && <LoadingData loading={isLoadingWorkshops} message="Cargando talleres..." />}

      {!isLoadingWorkshops && workshops.length > 0 && (
        <div className="flex flex-col gap-0.5 h-[55vh] overflow-y-auto border border-gray-300 rounded-md p-2">
          {workshops.map((workshop) => (
            <WorkshopItemUI key={workshop.id} workshop={workshop} />
          ))}
        </div>
      )}

      {!isLoadingWorkshops && workshops.length === 0 && (
        <div>
          <Empty description="No hay talleres registrados" />
        </div>
      )}
    </div>
  );
};
