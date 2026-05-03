import { useCallback, useMemo, useState } from "react";
import { useModal } from "tomascomponents";
import type { MaintenanceListRow } from "@/services/maintenance.service";
import { useMaintenanceListQuery } from "@/services/maintenance.service";
import { MaintenanceCreateUI } from "../create/MaintenanceCreateUI.controller";
import { useVehiclesQuery } from "@/services/vehiculo.service";
import { useWorkshopsQuery } from "@/services/taller.service";
import { useLocalStorage } from "@/store/useLocalStorage";
import type { DefaultOptionType } from "antd/es/select";

export interface IMaintenanceListUI {
  maintenances: MaintenanceListRow[];
  isLoadingMaintenance: boolean;
  openModalCreateMaintenance: () => void;
  selectedVehicleId?: string;
  vehiclesOptions: DefaultOptionType[];
  workshopsOptions: DefaultOptionType[];
  selectedWorkshopId?: string;
  handleSelectVehicle: (vehicleId: string) => void;
  handleSelectWorkshop: (workshopId?: string) => void;
}

export const useMaintenanceListUI = (): IMaintenanceListUI => {
  const { openModal } = useModal();
  const { data: maintenances = [], isLoading: isLoadingMaintenance } = useMaintenanceListQuery();
  const [manuallySelectedVehicleId, setManuallySelectedVehicleId] = useState<string>();
  const [manuallySelectedWorkshopId, setManuallySelectedWorkshopId] = useState<string>();
  const { favoriteVehiclesId } = useLocalStorage();
  const { data: vehiclesOptions = [] } = useVehiclesQuery();
  const { data: workshopsOptions = [] } = useWorkshopsQuery();

  const normalizedVehiclesOptions = useMemo(() => {
    return vehiclesOptions.map((vehicle) => ({
      label: `${vehicle.placa} · ${vehicle.marca} ${vehicle.modelo}`,
      value: vehicle.id,
    }));
  }, [vehiclesOptions]);

  const normalizedWorkshopsOptions = useMemo(() => {
    return workshopsOptions.map((workshop) => ({
      label: `${workshop.nombre} · ${workshop.especialidad}` ,
      value: workshop.id,
    }));
  }, [workshopsOptions]);

  const favoriteVehicleIdFromList = useMemo(() => {
    return vehiclesOptions.find((vehicle) => vehicle.id === favoriteVehiclesId)?.id;
  }, [vehiclesOptions, favoriteVehiclesId]);

  const openModalCreateMaintenance = useCallback(() => {
    openModal({
      title: "Registrar mantenimiento",
      content: <MaintenanceCreateUI />,
      width: "42vw",
      height: "auto",
    });
  }, [openModal]);

  const handleSelectVehicle = useCallback((vehicleId: string) => {
    setManuallySelectedVehicleId(vehicleId);
  }, []);

  const handleSelectWorkshop = useCallback((workshopId?: string) => {
    setManuallySelectedWorkshopId(workshopId || undefined);
  }, []);

  const selectedVehicleId = manuallySelectedVehicleId ?? favoriteVehicleIdFromList;

  const maintenancesFiltered = useMemo(() => {
    return maintenances.filter((maintenance) => {
      if (selectedVehicleId != null && maintenance.vehiculo_id !== selectedVehicleId) {
        return false;
      }
      const workshopId = manuallySelectedWorkshopId;
      if (workshopId != null && maintenance.taller_id !== workshopId) {
        return false;
      }
      return true;
    });
  }, [maintenances, selectedVehicleId, manuallySelectedWorkshopId]);

  return {
    maintenances: maintenancesFiltered,
    isLoadingMaintenance,
    openModalCreateMaintenance,
    selectedVehicleId,
    vehiclesOptions: normalizedVehiclesOptions,
    workshopsOptions: normalizedWorkshopsOptions,
    selectedWorkshopId: manuallySelectedWorkshopId,
    handleSelectVehicle,
    handleSelectWorkshop,
  };
};
