import { useCallback } from "react";
import { useModal } from "tomascomponents";
import type { MaintenanceListRow } from "@/services/maintenance.service";
import { useMaintenanceListQuery } from "@/services/maintenance.service";
import { MaintenanceCreateUI } from "../create/MaintenanceCreateUI.controller";

export interface IMaintenanceListUI {
  maintenances: MaintenanceListRow[];
  isLoadingMaintenance: boolean;
  openModalCreateMaintenance: () => void;
}

export const useMaintenanceListUI = (): IMaintenanceListUI => {
  const { openModal } = useModal();
  const { data: maintenances = [], isLoading: isLoadingMaintenance } = useMaintenanceListQuery();

  const openModalCreateMaintenance = useCallback(() => {
    openModal({
      title: "Registrar mantenimiento",
      content: <MaintenanceCreateUI />,
      width: "42vw",
      height: "auto",
    });
  }, [openModal]);

  return {
    maintenances,
    isLoadingMaintenance,
    openModalCreateMaintenance,
  };
};
