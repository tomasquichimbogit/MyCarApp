import { useCallback } from "react";
import { useModal } from "tomascomponents";
import { useWorkshopsQuery, type WorkshopRecord } from "@/services/taller.service";
import { WorkhopsCreateUI } from "../create/WorkhopsCreateUI.controller";

export interface IWorkhopsListUI {
  workshops: WorkshopRecord[];
  isLoadingWorkshops: boolean;
  openModalCreateWorkshop: () => void;
}

export const useWorkhopsListUI = (): IWorkhopsListUI => {
  const { openModal } = useModal();

  const { data: workshops = [], isLoading: isLoadingWorkshops } = useWorkshopsQuery();



  const openModalCreateWorkshop = useCallback(() => {
    openModal({
      title: "Agregar taller",
      content: <WorkhopsCreateUI />,
      width: "40vw",
      height: "auto",
    });
  }, [openModal]);



  return {
    workshops,
    isLoadingWorkshops,
    openModalCreateWorkshop,
  };
};
