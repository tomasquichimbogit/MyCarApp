import { useMaintenances } from "@/services/maintenance/maintenance.services";
import { useNavigate } from "react-router-dom";
import type { IMaintenance } from "./interfaces";
import { PATHS } from "@/router/paths";

export interface IUseMaintenanceUIHook {
  maintenances: IMaintenance[];
  isLoading: boolean;
  isError: boolean;
  handleAddNewMaintenance: () => void;
}

export const useMaintenanceUIHook = (): IUseMaintenanceUIHook => {
  const navigate = useNavigate();
  const { data: maintenances = [], isLoading, isError } = useMaintenances();

  const handleAddNewMaintenance = () => {
    navigate(PATHS.maintenanceCreate);
  };

  return {
    maintenances,
    isLoading,
    isError,
    handleAddNewMaintenance,
  };
};
