import type { IWorkshop } from "../form/interfaces";
import { MapPin, Phone, Star } from "lucide-react";
import { Tag } from "antd";

interface IItemWorkshopUIProps {
  workshop: IWorkshop;
}

export const ItemWorkshopUI = ({ workshop }: IItemWorkshopUIProps) => {
  const location = [workshop.city, workshop.state, workshop.country].filter(Boolean).join(", ");
  const mainPhone = workshop.whatsapp ?? workshop.phones[0];

  return (
    <article className="w-full overflow-hidden rounded-2xl border border-orange-rally bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-900">{workshop.name}</h3>
          {workshop.description && <p className="text-sm text-gray-500">{workshop.description}</p>}
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-rally/10 px-2.5 py-1 text-sm font-semibold text-orange-rally">
          <Star className="h-4 w-4 fill-orange-rally" />
          {workshop.rating.toFixed(1)}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-rally" />
          <span>{location ? `${workshop.address}, ${location}` : workshop.address}</span>
        </div>

        {mainPhone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-orange-rally" />
            <span>{mainPhone}</span>
          </div>
        )}
      </div>

      {workshop.services.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {workshop.services.slice(0, 3).map((service) => (
            <Tag key={service} color="blue">
              {service}
            </Tag>
          ))}
        </div>
      )}
    </article>
  );
};
