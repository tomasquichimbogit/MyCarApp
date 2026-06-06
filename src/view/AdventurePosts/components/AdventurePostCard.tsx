import { Heart, MapPin, MessageCircle, Share2 } from "lucide-react";
import type { IAdventurePost } from "../interfaces";
import { YouTubeEmbed } from "./YouTubeEmbed";

interface AdventurePostCardProps {
  post: IAdventurePost;
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} sem`;
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
};

const formatCount = (count: number) => {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(".0", "")}k`;
  return count.toString();
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const AdventurePostCard = ({ post }: AdventurePostCardProps) => {
  const { author, content, videoId, location, createdAt, likes, comments, tags } = post;

  return (
    <article className="w-full overflow-hidden rounded-2xl border border-orange-rally/25 bg-white shadow-sm transition-shadow hover:shadow-md">
      <header className="flex items-start gap-3 px-4 pt-4 pb-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-orange-rally to-red-dakar text-sm font-bold text-sand-white">
          {author.avatar ? (
            <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" />
          ) : (
            getInitials(author.name)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h3 className="truncate text-sm font-bold text-gray-900">{author.name}</h3>
            {author.role && (
              <span className="rounded-full bg-light-beige px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-rally">
                {author.role}
              </span>
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500">
            <time dateTime={createdAt}>{formatRelativeTime(createdAt)}</time>
            {location && (
              <>
                <span aria-hidden>·</span>
                <span className="flex items-center gap-1 text-orange-rally/80">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {location}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 pb-3">
        <p className="text-sm leading-relaxed text-gray-800">{content}</p>
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-desert-sand/20 px-2.5 py-0.5 text-xs font-medium text-helmet-blue"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pb-3">
        <YouTubeEmbed videoId={videoId} title={content} />
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-rally/15 text-orange-rally">
            <Heart className="h-3 w-3 fill-orange-rally" />
          </span>
          {formatCount(likes)} me gusta
        </span>
        <span>{formatCount(comments)} comentarios</span>
      </div>

      <footer className="grid grid-cols-3 border-t border-gray-100">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-orange-rally/5 hover:text-orange-rally"
        >
          <Heart className="h-4 w-4" />
          Me gusta
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-orange-rally/5 hover:text-orange-rally"
        >
          <MessageCircle className="h-4 w-4" />
          Comentar
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-orange-rally/5 hover:text-orange-rally"
        >
          <Share2 className="h-4 w-4" />
          Compartir
        </button>
      </footer>
    </article>
  );
};
