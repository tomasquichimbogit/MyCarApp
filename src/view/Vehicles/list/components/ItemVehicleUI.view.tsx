import type { IVehicles } from "../intefaces";
import { useNavigate } from "react-router-dom";
import { Button as AntdButton, Tag, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, useModal } from "tomascomponents";
import { PATHS } from "@/router/paths";
import { BucketName } from "@/enums";
import { VehicleUpdateUIView } from "../../update/VehicleUpdateUI.view";
import { FilePenLine, PencilIcon, WrenchIcon } from "lucide-react";
import { useDeleteVehicle } from "@/services/vehicles/vehicles.services";
import { vehiclesKeys } from "@/services/vehicles/vehiclesKeys";
import { StorageImageManagerUI } from "@/components/Render/StorageImageManagerUI.view";

interface ItemVehicleUIProps {
  vehicle: IVehicles;
}
export const ItemVehicleUI = ({ vehicle }: ItemVehicleUIProps) => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { brand, model, year, color } = vehicle;
  const { mutate: deleteVehicle, isPending: isDeletingVehicle } = useDeleteVehicle();
  const vehicleId = Number(vehicle.id);

  const vehicleName = `${brand} ${model}`.trim();

  const handleNavigateToPath = (path: string) => {
    navigate(path);
  };

  const openModalUpdateVehicle = () => {
    openModal({
      title: "Actualizar vehículo",
      content: <VehicleUpdateUIView vehicleId={vehicleId} />,
      width: "500px	",
      height: "auto",
      closable: false,
    });
  };

  const handleConfirmDeleteVehicle = () => {
    deleteVehicle(vehicleId);
  };

  return (
    <div className="w-full rounded-2xl border border-orange-rally bg-gray-100/50 shadow-sm">
      <div className="flex flex-row items-stretch justify-center gap-0.5">
        <div className="shrink-0 self-stretch w-28 sm:w-32">
          <StorageImageManagerUI
            itemKey={vehicle.id}
            bucketName={BucketName.VEHICLE_IMAGES}
            modalTitle={`Actualizar imagen - ${vehicleName}`}
            imageAlt={vehicleName}
            wrapperClassName="relative w-full h-full min-h-[150px] pt-0.5 pb-0.5"
            editButtonStyle={{ color: "#d8ff28" }}
            invalidateQueryKey={vehiclesKeys.list()}
          />
        </div>

        <div className="flex flex-1 flex-col self-stretch p-1">
          <div className="flex flex-1 flex-col gap-2 bg-gray-100/50 rounded-xl p-2">
            <div className="flex flex-row items-center justify-between">
              <span className="text-sm md:text-lg font-bold text-gray-900">{vehicleName}</span>
              <div className="flex flex-row items-center gap-1">
                <AntdButton type="primary" icon={<EditOutlined />} size="small" onClick={openModalUpdateVehicle} />

                <Popconfirm
                  title="Eliminar vehículo"
                  description="Esta acción eliminará el vehículo."
                  okText="Eliminar"
                  cancelText="Cancelar"
                  okButtonProps={{ danger: true, loading: isDeletingVehicle }}
                  onConfirm={handleConfirmDeleteVehicle}
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
