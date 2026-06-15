import { useNavigate } from "react-router-dom";
import type { IMaintenance } from "./interfaces";
import { PATHS } from "@/router/paths";

export interface IUseMaintenanceUIHook {
  maintenances: IMaintenance[];
  handleAddNewMaintenance: () => void;
}

export const useMaintenanceUIHook = (): IUseMaintenanceUIHook => {
  const navigate = useNavigate();
  const handleAddNewMaintenance = () => {
    navigate(PATHS.maintenanceCreate);
  };

  return {
    maintenances: [],
    handleAddNewMaintenance,
  };
};
