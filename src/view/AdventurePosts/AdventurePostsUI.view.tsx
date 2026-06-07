import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import type { IUseAdventurePostsUIHook } from "./AdventurePostsUI.hook";
import { AdventurePostCard } from "./components/AdventurePostCard";

export const AdventurePostsUIView = ({ posts, isLoading, isError }: IUseAdventurePostsUIHook) => {
  return (
    <CentralContainerUI title="Aventura" subtitle="Explora rutas, rallies y aventuras sobre ruedas. Comparte la pasión por el camino.">
      <div className="flex w-full flex-col gap-0.5 pb-2">
        {/* <p className="flex items-start gap-2 rounded-xl border border-desert-sand/40 bg-white px-4 py-3 text-sm text-gray-600">
          <Compass className="mt-0.5 h-4 w-4 shrink-0 text-orange-rally" />
          <span>Explora rutas, rallies y aventuras sobre ruedas. Comparte la pasión por el camino.</span>
        </p> */}
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
          <p className="rounded-xl border border-desert-sand/40 bg-white px-4 py-6 text-center text-sm text-gray-500">
            Aún no hay aventuras publicadas.
          </p>
        )}
        {posts.map((post) => (
          <AdventurePostCard key={post.id} post={post} />
        ))}
      </div>
    </CentralContainerUI>
  );
};
