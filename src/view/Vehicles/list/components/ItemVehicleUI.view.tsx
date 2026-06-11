import type { IVehicles } from "../intefaces";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { IMG_FALLBACK } from "@/constants";
import { Button, useModal } from "tomascomponents";
import { PATHS } from "@/router/paths";
import { UploadImageUI } from "@/components/Render/UploadImages/UploadImageUI.view";
import { BucketName } from "@/enums";
import { useQueryClient } from "@tanstack/react-query";
import { vehiclesKeys } from "@/services/vehicles/vehiclesKeys";
import { useTokenBuketAccess } from "@/hooks/useTokenBuketAccess";
import { useState } from "react";


interface ItemVehicleUIProps {
  vehicle: IVehicles;
}
export const ItemVehicleUI = ({ vehicle }: ItemVehicleUIProps) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { brand, model, year, color } = vehicle;
  const queryClient = useQueryClient();
  const [reloadImageKey, setReloadImageKey] = useState(0);

  const vehicleName = `${brand} ${model}`.trim();

  const handleNavigateToPath = (path: string) => {
    navigate(path);
  };

  const openModalUploadImage = () => {
    openModal({
      title: `Actualizar imagen - ${vehicleName}`,
      content: (
        <UploadImageUI
          maxFiles={1}
          bucketName={BucketName.VEHICLE_IMAGES}
          onCancel={() => closeModal()}
          itemKey={vehicle.id}
          onUploaded={async () => {
            setReloadImageKey((prev) => prev + 1);
            await queryClient.invalidateQueries({ queryKey: vehiclesKeys.list() });
            closeModal();
          }}
        />
      ),
      width: "450px",
      height: "auto",
      footer: <div>test</div>,
    });
  };

  const imageUrl = useTokenBuketAccess({
    bucketName: BucketName.VEHICLE_IMAGES,
    itemKey: vehicle.id,
    reloadKey: reloadImageKey,
  });


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
