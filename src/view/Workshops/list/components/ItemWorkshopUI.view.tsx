import { ImageComponent } from "@/components/Render/ImageComponent";
import { BucketName } from "@/constants";
import type { IWorkshop } from "../interfaces";
import {
  buildWhatsAppUrl,
  formatWorkshopSchedule,
  getWorkshopAddress,
  getWorkshopCategory,
  getWorkshopMainPhone,
  isWorkshopOpen,
} from "./workshop.utils";
import { Clock, MapPin, MessageCircle, Phone, Star, Wrench } from "lucide-react";

interface IItemWorkshopUIProps {
  workshop: IWorkshop;
}

const StarRating = ({ rating = 0 }: { rating?: number }) => {
  const normalizedRating = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => {
          const fillAmount = Math.max(0, Math.min(1, normalizedRating - index));
          return (
            <span key={index} className="relative inline-flex h-3.5 w-3.5">
              <Star className="absolute h-3.5 w-3.5 text-desert-sand/30" />
              <span className="absolute overflow-hidden" style={{ width: `${fillAmount * 100}%` }}>
                <Star className="h-3.5 w-3.5 fill-orange-rally text-orange-rally" />
              </span>
            </span>
          );
        })}
      </div>
      <span className="text-xs font-semibold text-orange-rally">{normalizedRating.toFixed(1)}</span>
    </div>
  );
};

export const ItemWorkshopUI = ({ workshop }: IItemWorkshopUIProps) => {
  const mainPhone = getWorkshopMainPhone(workshop);
  const fullAddress = getWorkshopAddress(workshop);
  const scheduleLabel = formatWorkshopSchedule(workshop.schedule);
  const category = getWorkshopCategory(workshop);
  const isOpen = isWorkshopOpen(workshop.schedule);

  const handleChat = () => {
    if (!mainPhone) return;
    window.open(buildWhatsAppUrl(mainPhone, workshop.name), "_blank", "noopener,noreferrer");
  };

  return (
    <article className="w-full overflow-hidden rounded-2xl border border-desert-sand/40 bg-carbon-black shadow-sm">
      <div className="flex items-stretch">
        <div className="relative w-28 shrink-0 self-stretch sm:w-32">
          <div className="relative h-full min-h-[148px] w-full p-1">
            <ImageComponent
              bucket={BucketName.WORKSHOP_IMAGES}
              path={`${workshop.id}.webp`}
              alt={`Portada de ${workshop.name}`}
              width="100%"
              height="100%"
              preview
            />
          </div>

          <span
            className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${isOpen ? "bg-emerald-500/90 text-white" : "bg-graphite-gray text-desert-sand"
              }`}
          >
            {isOpen ? "Abierto" : "Cerrado"}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-desert-sand/30 bg-white">
                <ImageComponent
                  bucket={BucketName.WORKSHOP_LOGOS}
                  path={`${workshop.id}.webp`}
                  alt={`Logo de ${workshop.name}`}
                  width="100%"
                  height="100%"
                  preview
                />
              </div>
              <h3 className="truncate text-sm font-bold text-white sm:text-base">{workshop.name}</h3>
            </div>

            <StarRating rating={workshop.rating} />
          </div>

          <div className="flex flex-col gap-1 text-xs text-desert-sand sm:text-sm">
            {category && (
              <div className="flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 shrink-0 text-orange-rally" />
                <span className="truncate">{category}</span>
              </div>
            )}

            {fullAddress && (
              <div className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-rally" />
                <span className="line-clamp-2">{fullAddress}</span>
              </div>
            )}

            {scheduleLabel && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0 text-orange-rally" />
                <span className="truncate">{scheduleLabel}</span>
              </div>
            )}

            {mainPhone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 shrink-0 text-orange-rally" />
                <span className="truncate font-medium text-orange-rally">{mainPhone}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleChat}
            disabled={!mainPhone}
            className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl bg-orange-rally px-2 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-dakar disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            Chatear
          </button>
        </div>
      </div>
    </article>
  );
};
