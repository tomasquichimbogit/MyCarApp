import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import type { IUseAdventurePostsUIHook } from "./AdventurePostsUI.hook";
import { AdventurePostCard } from "./components/AdventurePostCard";
import { Select } from "tomascomponents";
import { Empty } from "antd";

export const AdventurePostsUIView = ({ posts, isLoading, isError, locationOptions, selectedLocation, setSelectedLocation }: IUseAdventurePostsUIHook) => {
  return (
    <CentralContainerUI title="Aventura">
      <div className="flex flex-col gap-0.5">
        <div className="flex-1">
          <Select
            options={locationOptions.map((location) => ({ label: location, value: location }))}
            value={selectedLocation}
            onChange={setSelectedLocation}
            placeholder="Selecciona un país"
            showSearch
            className="adventure-location-select w-1/2"
            classNames={{
              popup: {
                root: "adventure-location-select-popup",
              },
            }}
            styles={{
              root: {
                backgroundColor: "var(--color-light-beige)",
                borderColor: "var(--color-orange-rally)",
              },
              content: {
                color: "var(--color-orange-rally)",
                fontWeight: 600,
              },
              placeholder: {
                color: "color-mix(in srgb, var(--color-orange-rally) 55%, transparent)",
              },
              suffix: {
                color: "var(--color-orange-rally)",
              },
            }}
          />
        </div>
        <div className="max-h-[calc(78vh-2rem)] overflow-y-auto">
          <div className="flex w-full flex-col gap-0.5 pb-2 ">
            {isLoading && (
              <p className="rounded-xl border border-desert-sand/40 bg-white px-4 py-6 text-center text-sm text-gray-500">
                Cargando aventuras...
              </p>
            )}
            {isError && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-600">
                No se pudieron cargar las aventuras. Intenta de nuevo más tarde.
              </p>
            )}
            {!isLoading && !isError && posts.length === 0 && (
              <Empty
                description={<span className="text-orange-rally">No hay aventuras publicadas en este país</span>}
              />
            )}
            {posts.map((post) => (
              <AdventurePostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </CentralContainerUI>
  );
};
