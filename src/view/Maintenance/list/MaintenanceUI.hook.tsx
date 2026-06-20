import { useDeleteMaintenance, useMaintenancesByVehicleId } from "@/services/maintenance/maintenance.services";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import type { IMaintenance } from "./interfaces";
import { PATHS } from "@/router/paths";
import { useRouteQueryParams } from "@/hooks/useRouteQueryParams";
import { matchesSearch } from "@/helper";

export interface IUseMaintenanceUIHook {
  maintenances: IMaintenance[];
  isLoading: boolean;
  isError: boolean;
  handleAddNewMaintenance: () => void;
  setSelectedVehicleId: (vehicleId: number) => void;
  selectedVehicleId?: number;
  handleDeleteMaintenance: (maintenanceId: number) => void;
  isDeletingMaintenance: boolean;
  search: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showInputSearch: boolean;
}

export const useMaintenanceUIHook = (): IUseMaintenanceUIHook => {
  const [search, setSearch] = useState<string>("");
  const { getNumberParam } = useRouteQueryParams();
  const vehicleId = getNumberParam("vehicleId");
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | undefined>(vehicleId);
  const navigate = useNavigate();
  const { data: maintenances = [], isLoading, isError } = useMaintenancesByVehicleId(selectedVehicleId);
  const { mutate: deleteMaintenance, isPending: isDeletingMaintenance } = useDeleteMaintenance();
  const handleAddNewMaintenance = () => {
    navigate(`${PATHS.maintenanceCreate}?vehicleId=${selectedVehicleId}`);
  };

  const handleDeleteMaintenance = (maintenanceId: number) => {
    deleteMaintenance(maintenanceId);
  };

  const filteredMaintenances = useMemo(
    () => maintenances.filter((m) =>
      matchesSearch(m, search, ["description", "workshopName", "vehiclePlate", "maintenanceType", "date"]),
    ),
    [maintenances, search],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const showInputSearch = useMemo(() => {
    return maintenances.length > 0;
  }, [maintenances]);

  return {
    maintenances: filteredMaintenances,
    isLoading,
    isError,
    handleAddNewMaintenance,
    setSelectedVehicleId,
    selectedVehicleId,
    handleDeleteMaintenance,
    isDeletingMaintenance,
    search,
    handleSearchChange,
    showInputSearch,
  };
};
