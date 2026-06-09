import type { IWorkshop } from "./interfaces";
import { ExternalLink, MapPin, Phone, Star } from "lucide-react";
import { Tag } from "antd";
import { useState } from "react";

interface IItemWorkshopUIProps {
  workshop: IWorkshop;
}

export const ItemWorkshopUI = ({ workshop }: IItemWorkshopUIProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const location = [workshop.city, workshop.state, workshop.country].filter(Boolean).join(", ");
  const mainPhone = workshop.whatsapp ?? workshop.phones[0];
  const fullAddress = location ? `${workshop.address ?? ""}, ${location}` : workshop.address;

  const handleOpenMap = () => {
    const query =
      workshop.latitude && workshop.longitude
        ? `${workshop.latitude},${workshop.longitude}`
        : fullAddress ?? workshop.name;

    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="w-full overflow-hidden rounded-2xl border border-orange-rally bg-white p-2 shadow-sm">
      <div className="flex items-start justify-between gap-1">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-bold text-gray-900">{workshop.name}</h3>
          {workshop.description && <p className="text-sm text-gray-500">{workshop.description}</p>}
        </div>

        <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-orange-rally/10 px-2 py-0.5 text-sm font-semibold text-orange-rally">
          <Star className="h-4 w-4 fill-orange-rally" />
          {workshop.rating ? workshop.rating.toFixed(1) : 0}
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-0.5 text-sm text-gray-600">
        <div className="flex items-start gap-1">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-rally" />
          <span>{fullAddress}</span>
        </div>

        {mainPhone && (
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4 shrink-0 text-orange-rally" />
            <span>{mainPhone}</span>
          </div>
        )}
      </div>

      {workshop.services.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {workshop.services.slice(0, 3).map((service) => (
            <Tag key={service} color="blue">
              {service}
            </Tag>
          ))}
        </div>
      )}

      {showDetails && (
        <div className="mt-1 rounded-xl border border-gray-100 bg-gray-50 p-2 text-sm text-gray-600">
          {workshop.emails.length > 0 && <p>Correo: {workshop.emails.join(", ")}</p>}
          {workshop.website && <p>Web: {workshop.website}</p>}
          {workshop.facebook && <p>Facebook: {workshop.facebook}</p>}
          {workshop.instagram && <p>Instagram: {workshop.instagram}</p>}
          {workshop.rating_count ? <p>Reseñas: {workshop.rating_count}</p> : null}
        </div>
      )}

      <div className="mt-1 flex gap-1 border-t border-gray-100 pt-1">
        <button
          type="button"
          onClick={() => setShowDetails((current) => !current)}
          className="flex flex-1 items-center justify-center rounded-xl border border-orange-rally px-2 py-1.5 text-sm font-semibold text-orange-rally transition-colors hover:bg-orange-rally/10"
        >
          {showDetails ? "Ocultar detalles" : "Ver detalles"}
        </button>

        <button
          type="button"
          onClick={handleOpenMap}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-orange-rally px-2 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-dakar"
        >
          <ExternalLink className="h-4 w-4" />
          Google Maps
        </button>
      </div>
    </article>
  );
};
