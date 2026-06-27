import { CalendarDays, CheckCircle, DollarSign, Gauge, MapPin, PencilIcon, Trash2, XCircle } from "lucide-react";
import type { IMaintenance } from "../interfaces";
import { BucketName } from "@/constants";
import { ImageComponent } from "@/components/Render/ImageComponent";
import { IconCarSuv } from "@/assets/svg";
import { Popconfirm } from "antd";
import { useModal } from "tomascomponents";
import { MaintenanceUpdateUI } from "../../update/MaintenanceUpdateUI.controller";

interface ItemListMaintenanceUIViewProps {
    maintenance: IMaintenance;
    onDelete?: (maintenanceId: number) => void;
    isDeleting?: boolean;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-EC", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);

const formatDate = (value: string) => {
    const [year, month, day] = value.split("T")[0]?.split("-").map(Number) ?? [];
    const date = year && month && day
        ? new Date(year, month - 1, day)
        : new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("es-EC", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
};

export const ItemListMaintenanceUIView = ({
    maintenance,
    onDelete,
    isDeleting,
}: ItemListMaintenanceUIViewProps) => {
    const { openModal } = useModal();
    const title = maintenance.workshopName ?? maintenance.vehiclePlate;

    const handleOpenEditModal = () => {
        openModal({
            title: "Editar mantenimiento",
            content: <MaintenanceUpdateUI maintenanceId={maintenance.id} />,
            width: "500px",
            height: "auto",
        });
    };
   

    return (
      <article className="rounded-2xl border border-desert-sand/40 bg-carbon-black p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-desert-sand/40 bg-white">
              <ImageComponent
                bucket={BucketName.WORKSHOP_LOGOS}
                path={`${maintenance.workshopId}.webp`}
                alt="Imagen de ejemplo"
                height="100%"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-bold text-white">{title}</h3>
                <span className="rounded-full bg-orange-rally/15 px-3 py-1 text-sm font-medium text-orange-rally">
                  {maintenance.maintenanceType}
                </span>
              </div>

              {maintenance.workshopName && (
                <div className="flex flex-row gap-1">
                  <p className="mt-1 flex items-center gap-1 text-sm text-desert-sand">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {maintenance.vehiclePlate}
                  </p>
                  <div className="border border-led-yellow rounded-full px-2">
                    <small className="mt-1 flex items-center gap-1 text-xs text-orange-rally">
                      {maintenance.confirmedWorkshop ? "Confirmado" : "Pendiente de confirmación"}
                      {maintenance.confirmedWorkshop && <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />}
                      {!maintenance.confirmedWorkshop && <XCircle className="h-4 w-4 shrink-0 text-red-500" />}
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="rounded-lg p-1 text-desert-sand transition hover:bg-white/10 hover:text-orange-rally"
              aria-label="Editar mantenimiento"
              onClick={handleOpenEditModal}
            >
              <div className="flex flex-row items-center gap-1">
                <PencilIcon className="h-5 w-5" />
                Editar
              </div>
            </button>

            {onDelete && (
              <Popconfirm
                title="Eliminar mantenimiento"
                description="Esta acción eliminará el mantenimiento."
                okText="Eliminar"
                cancelText="Cancelar"
                okButtonProps={{ danger: true, loading: isDeleting }}
                onConfirm={() => onDelete(maintenance.id)}
              >
                <button
                  type="button"
                  className="rounded-lg p-1 text-desert-sand transition hover:bg-white/10 hover:text-orange-rally"
                  aria-label="Eliminar mantenimiento"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </Popconfirm>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          <span className="flex items-center gap-2 rounded-lg bg-helmet-blue px-3 py-2 text-sm font-semibold text-white">
            <IconCarSuv className="w-10 h-10 text-orange-rally" transform="scale(-1, 1)" />
            {maintenance.vehiclePlate}
          </span>
          <span className="flex items-center gap-2 rounded-lg bg-helmet-blue px-3 py-2 text-sm font-semibold text-white">
            <CalendarDays className="h-4 w-4 text-orange-rally" />
            {formatDate(maintenance.date)}
          </span>
          <span className="flex items-center gap-2 rounded-lg bg-helmet-blue px-3 py-2 text-sm font-semibold text-white">
            <Gauge className="h-4 w-4 text-orange-rally" />
            {maintenance.mileage.toLocaleString("es-EC")} km
          </span>
          <span className="flex items-center gap-2 rounded-lg bg-helmet-blue px-3 py-2 text-sm font-semibold text-white">
            <DollarSign className="h-4 w-4 text-orange-rally" />
            {formatCurrency(maintenance.cost)}
          </span>
        </div>

        <p className="mt-3 rounded-lg bg-helmet-blue px-3 py-3 text-sm text-white">{maintenance.description}</p>
      </article>
    );
};