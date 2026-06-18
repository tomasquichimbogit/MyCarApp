import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import { Empty } from "antd";
import { Input } from "tomascomponents";
import type { IUseWorkshopsListUIHook } from "./WorkshopsListUI.hook";
import { ItemWorkshopUI } from "./components/ItemWorkshopUI.view";

export const WorkshopsListView = ({
  workshops,
  isLoading,
  isError,
  search,
  handleSearchChange,
  selectedFilter,
  setSelectedFilter,
  serviceFilters,
}: IUseWorkshopsListUIHook) => {
  return (
    <CentralContainerUI
      title="Talleres de confianza"
      subtitle="Encuentra el taller ideal para tu vehículo"
    >
      <div className="flex w-full flex-col gap-2 pt-1">
        <Input
          placeholder="Buscar taller por nombre o dirección"
          value={search}
          onChange={handleSearchChange}
          allowClear
        />

        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {serviceFilters.map((filter) => {
            const isSelected = selectedFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  isSelected
                    ? "bg-helmet-blue text-white"
                    : "border border-desert-sand/30 bg-graphite-gray text-desert-sand hover:border-orange-rally/50"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {isLoading && (
          <p className="rounded-xl border border-desert-sand/40 bg-carbon-black px-4 py-6 text-center text-sm text-desert-sand">
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

        <div className="flex max-h-[calc(100dvh-220px)] flex-col gap-2 overflow-y-auto md:max-h-[calc(100dvh-240px)]">
          {workshops.map((workshop) => (
            <ItemWorkshopUI key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </CentralContainerUI>
  );
};
