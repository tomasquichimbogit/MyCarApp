import type { IVehicles } from "../intefaces";
import { useNavigate } from "react-router-dom";
import { Image, Button as AntdButton, Tag, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IMG_FALLBACK } from "@/constants";
import { Button, useModal } from "tomascomponents";
import { PATHS } from "@/router/paths";
import { UploadImageUI } from "@/components/Render/UploadImages/UploadImageUI.view";
import { BucketName } from "@/enums";
import { useQueryClient } from "@tanstack/react-query";
import { vehiclesKeys } from "@/services/vehicles/vehiclesKeys";
import { useTokenBuketAccess } from "@/hooks/useTokenBuketAccess";
import { useState } from "react";
import { VehicleUpdateUIView } from "../../update/VehicleUpdateUI.view";
import { FilePenLine, PencilIcon, WrenchIcon } from "lucide-react";

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

  const { imageUrl, isError } = useTokenBuketAccess({
    bucketName: BucketName.VEHICLE_IMAGES,
    itemKey: vehicle.id,
    reloadKey: reloadImageKey,
  });

  const openModalUpdateVehicle = () => {
    openModal({
      title: "Actualizar vehículo",
      content: <VehicleUpdateUIView />,
      width: "500px	",
      height: "auto",
    });
  };

  return (
    <div className="w-full rounded-2xl border border-orange-rally bg-gray-100/50 shadow-sm">
      <div className="flex flex-row items-stretch justify-center gap-0.5">
        <div className="shrink-0 self-stretch w-28 sm:w-32">
          <div className="relative w-full h-full min-h-[150px] pt-0.5 pb-0.5">
            <Image
              alt={vehicleName}
              width="100%"
              height="100%"
              src={imageUrl}
              fallback={IMG_FALLBACK}
              onClick={isError ? openModalUploadImage : undefined}
              preview={!isError}
              wrapperStyle={{ width: "100%", height: "100%", display: "block", lineHeight: 0 }}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                cursor: "pointer",
                borderRadius: 12,
                objectFit: "cover",
              }}
            />
            {!isError && (
              <AntdButton
                type="primary"
                shape="circle"
                size="small"
                icon={<EditOutlined />}
                onClick={(event) => {
                  event.stopPropagation();
                  openModalUploadImage();
                }}
                style={{
                  position: "absolute",
                  right: 6,
                  bottom: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,.25)",
                }}
              />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col self-stretch p-1">
          <div className="flex flex-1 flex-col gap-2 bg-gray-100/50 rounded-xl p-2">
            <div className="flex flex-row items-center justify-between">
              <span className="text-sm md:text-lg font-bold text-gray-900">{vehicleName}</span>
              <div className="flex flex-row items-center gap-1">
                <AntdButton
                  type="primary"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => handleNavigateToPath(PATHS.vehicles)}
                />

                <Popconfirm
                  title="Eliminar vehículo"
                  description="Esta acción eliminará el vehículo."
                  okText="Eliminar"
                  cancelText="Cancelar"
                  okButtonProps={{ danger: true, loading: false }}
                  onConfirm={() => handleNavigateToPath(PATHS.vehicles)}
                >
                  <AntdButton type="primary" danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="text-sm text-gray-500">
                {year} · {color}
              </div>

              <div>
                <Tag color="blue">{vehicle.plate}</Tag>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button
                type="primary"
                title={
                  <div className="flex flex-row items-center gap-1">
                    Ver mantenimientos <FilePenLine className="w-4 h-4" color="#b9c2d0" />
                  </div>
                }
                onClick={() => handleNavigateToPath(PATHS.maintenance)}
              />
              <Button
                type="primary"
                title={
                  <div className="flex flex-row items-center gap-1">
                    Ver talleres <WrenchIcon className="w-4 h-4" color="#b9c2d0" />
                  </div>
                }
                onClick={() => handleNavigateToPath(PATHS.workshops)}
              />
              <Button
                type="default"
                title={
                  <div className="flex flex-row items-center gap-1">
                    Detalles <PencilIcon className="w-4 h-4" color="#b9c2d0" />
                  </div>
                }
                variant="outlined"
                onClick={openModalUpdateVehicle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
