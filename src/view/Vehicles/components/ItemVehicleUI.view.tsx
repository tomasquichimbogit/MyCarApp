import type { IVehicles } from "../list/intefaces";
import { Calendar, MoreVertical } from "lucide-react";
import defaultVehicleImage from "@/assets/images/fondo-login-4.jpg";
import { Button } from "tomascomponents";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";
import { Tag } from "antd";

interface ItemVehicleUIProps {
  vehicle: IVehicles;
  onMenuClick?: (vehicle: IVehicles) => void;
}

// const formatMileage = (mileage: number) => `${mileage.toLocaleString("es-ES")} km`;

export const ItemVehicleUI = ({ vehicle, onMenuClick }: ItemVehicleUIProps) => {
  const navigate = useNavigate();

  const { brand, model, year, color, plate, imageUrl, status = "Activo", fuelType } = vehicle;

  const vehicleName = `${brand} ${model}`.trim();

  const handleNavigateToPath = (path: string) => {
    navigate(path);
  };

  return (
    <article className="w-full overflow-hidden rounded-2xl border border-orange-rally bg-white shadow-sm">
      <div className="relative h-48 sm:h-52">
        <img src={imageUrl ?? defaultVehicleImage} alt={vehicleName} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/30 to-transparent" />
        <span className="absolute top-3 left-3 text-xs font-medium text-gray-600">{status}</span>
        <button
          type="button"
          onClick={() => onMenuClick?.(vehicle)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white"
          aria-label="Opciones del vehículo"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        <span className="absolute bottom-0 left-4 z-10 translate-y-1/2 rounded-lg bg-white px-3 py-1 text-sm font-bold text-gray-900 shadow-sm">
          {plate}
        </span>
      </div>

      <div className="px-4 pt-7 pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900">{vehicleName}</h3>
          {fuelType && (
            // <span className="flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
            //   <Zap className="h-3.5 w-3.5" />
            //   {fuelType}
            // </span>
            <Tag color="blue">{fuelType}</Tag>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>
            {year} · {color}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
        <Button title="Ver mantenimientos" onClick={() => handleNavigateToPath(PATHS.maintenance)} />
        <Button title="Ver talleres" onClick={() => handleNavigateToPath(PATHS.workshops)} />
      </div>
    </article>
  );
};

/*

 {mileage != null ? (
                    <div className="flex items-center gap-1.5">
                        <Gauge className="h-4 w-4 shrink-0" />
                        <span>{formatMileage(mileage)}</span>
                    </div>
                ) : (
                    <span />
                )}
                {nextMaintenance && (
                    <div className="flex items-center gap-1.5">
                        <Wrench className="h-4 w-4 shrink-0" />
                        <span>{nextMaintenance}</span>
                    </div>
                )}
*/
