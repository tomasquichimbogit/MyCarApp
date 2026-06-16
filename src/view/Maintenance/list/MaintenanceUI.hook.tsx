import { useMaintenancesByVehicleId } from "@/services/maintenance/maintenance.services";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { IMaintenance } from "./interfaces";
import { PATHS } from "@/router/paths";
import { useRouteQueryParams } from "@/hooks/useRouteQueryParams";

export interface IUseMaintenanceUIHook {
  maintenances: IMaintenance[];
  isLoading: boolean;
  isError: boolean;
  handleAddNewMaintenance: () => void;
  setSelectedVehicleId: (vehicleId: number) => void;
  selectedVehicleId?: number;
}

export const useMaintenanceUIHook = (): IUseMaintenanceUIHook => {
  const { getNumberParam } = useRouteQueryParams();
  const vehicleId = getNumberParam("vehicleId");
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | undefined>(vehicleId);
  const navigate = useNavigate();
  const { data: maintenances = [], isLoading, isError } = useMaintenancesByVehicleId(selectedVehicleId);

  const handleAddNewMaintenance = () => {
    navigate(`${PATHS.maintenanceCreate}?vehicleId=${selectedVehicleId}`);
  };


  return {
    maintenances,
    isLoading,
    isError,
    handleAddNewMaintenance,
    setSelectedVehicleId,
    selectedVehicleId,
  };
};
