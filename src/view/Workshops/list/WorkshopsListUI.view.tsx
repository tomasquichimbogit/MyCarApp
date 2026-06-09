import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import { Empty } from "antd";
import type { IUseWorkshopsListUIHook } from "./WorkshopsListUI.hook";
import { ItemWorkshopUI } from "./ItemWorkshopUI.view";

export const WorkshopsListView = ({ workshops, isLoading, isError }: IUseWorkshopsListUIHook) => {
  return (
    <CentralContainerUI title="Mis talleres de confianza">
      <div className="flex w-full flex-col gap-4">
        {isLoading && (
          <p className="rounded-xl border border-desert-sand/40 bg-white px-4 py-6 text-center text-sm text-gray-500">
            Cargando talleres...
          </p>
        )}

        {isError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-600">
            No se pudieron cargar los talleres. Intenta de nuevo más tarde.
          </p>
        )}

        {!isLoading && !isError && workshops.length === 0 && (
          <Empty description={<span className="text-white">No hay talleres registrados</span>} />
        )}

        {workshops.map((workshop) => (
          <ItemWorkshopUI key={workshop.id} workshop={workshop} />
        ))}
      </div>
    </CentralContainerUI>
  );
};