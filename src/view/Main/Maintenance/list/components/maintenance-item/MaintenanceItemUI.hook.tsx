import { useCallback } from "react";
import { useModal } from "tomascomponents";
import type { MaintenanceListRow } from "@/services/maintenance.service";
import type { IMaintenanceItemUIProps } from "./MaintenanceItemUI.controller";
import { ConfirmDeleteItemUIView } from "../ConfirmDeleteItemUI.view";
import { MaintenanceUpdateUI } from "../../../update/MaintenanceUpdateUI.controller";

export interface IMaintenanceItemUI {
  maintenance: MaintenanceListRow;
  openModalDeleteMaintenance: (maintenanceId?: string) => void;
  openModalUpdateMaintenance: (row?: MaintenanceListRow) => void;
}

export const useMaintenanceItemUI = (props: IMaintenanceItemUIProps): IMaintenanceItemUI => {
  const { maintenance } = props;
  const { openModal } = useModal();

  const openModalDeleteMaintenance = useCallback(
    (maintenanceId?: string) => {
      if (!maintenanceId) return;

      openModal({
        title: "Eliminar mantenimiento",
        content: <ConfirmDeleteItemUIView maintenanceId={maintenanceId} />,
        width: "40vw",
        height: "auto",
      });
    },
    [openModal],
  );

  const openModalUpdateMaintenance = useCallback(
    (row?: MaintenanceListRow) => {
      if (!row) return;

      openModal({
        title: "Actualizar mantenimiento",
        content: <MaintenanceUpdateUI maintenance={row} />,
        width: "42vw",
        height: "auto",
      });
    },
    [openModal],
  );

  return {
    maintenance,
    openModalDeleteMaintenance,
    openModalUpdateMaintenance,
  };
};
