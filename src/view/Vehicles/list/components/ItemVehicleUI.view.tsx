import type { IVehicles } from "../intefaces";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { IMG_FALLBACK } from "@/constants";
import { Button, useModal } from "tomascomponents";
import { PATHS } from "@/router/paths";
import { UploadImageUI } from "@/components/Render/UploadImages/UploadImageUI.view";
import { BucketName } from "@/enums";


interface ItemVehicleUIProps {
  vehicle: IVehicles;
}
export const ItemVehicleUI = ({ vehicle }: ItemVehicleUIProps) => {
  const navigate = useNavigate();
  const {openModal, closeModal} = useModal();
  const { brand, model, year, color, imageUrl } = vehicle;

  const vehicleName = `${brand} ${model}`.trim();

  const handleNavigateToPath = (path: string) => {
    navigate(path);
  };

  const openModalUploadImage = () => {
    openModal({
      title: `Actualizar imagen - ${vehicleName}`,
      content: (
        <UploadImageUI maxFiles={1} bucketName={BucketName.VEHICLE_IMAGES} onCancel={() => closeModal()} itemKey={vehicle.id} />
      ),
      width: "450px",
      height: "auto",
      footer: <div>test</div>,
    });
  };

  return (
    <div className="w-full rounded-2xl border border-orange-rally bg-gray-100/50 shadow-sm">
      <div className="flex flex-row items-stretch gap-2">
        <div className="shrink-0 bg-gray-200/10 rounded-md p-2">
          <Image
            alt={vehicleName}
            width={100}
            height={100}
            src={imageUrl}
            fallback={IMG_FALLBACK}
            onClick={openModalUploadImage}
            preview={false}
            style={{ cursor: "pointer", borderRadius: 8, objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-1 flex-col self-stretch p-2">
          <div className="flex flex-1 flex-col gap-2 bg-white rounded-md p-2">
            <div className="text-lg font-bold text-gray-900">{vehicleName}</div>
            <div className="text-sm text-gray-500">
              {year} · {color}
            </div>
            <div className="flex flex-row gap-0.5 justify-between">
              <Button type="primary" title="Ver mantenimientos" onClick={() => handleNavigateToPath(PATHS.maintenance)} />
              <Button type="primary" title="Ver talleres" onClick={() => handleNavigateToPath(PATHS.workshops)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
<article className="w-full overflow-hidden rounded-2xl border border-orange-rally bg-white shadow-sm">
      <div className="relative h-48 sm:h-52">
        <Image
          alt={vehicleName}
          width={200}
          height={200}
          src={imageUrl}
          fallback="data:image/png;base64,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"
        />
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


*/

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
