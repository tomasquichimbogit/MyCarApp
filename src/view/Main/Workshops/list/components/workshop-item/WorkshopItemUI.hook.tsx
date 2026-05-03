import { useCallback } from "react";
import { useModal } from "tomascomponents";
import type { WorkshopRecord } from "@/services/taller.service";
import type { IWorkshopItemUIProps } from "./WorkshopItemUI.controller";
import { ConfirmDeleteItemUIView } from "../ConfirmDeleteItemUI.view";
import { WorkhopsUpdateUI } from "../../../update/Workhops.controller";

export interface IWorkshopItemUI {
  workshop: WorkshopRecord;
  openModalDeleteWorkshop: (workshopId?: string) => void;
  openModalUpdateWorkshop: (workshop?: WorkshopRecord) => void;
}

export const useWorkshopItemUI = (props: IWorkshopItemUIProps): IWorkshopItemUI => {
  const { workshop } = props;
  const { openModal } = useModal();

  const openModalDeleteWorkshop = useCallback(
    (workshopId?: string) => {
      if (!workshopId) return;

      openModal({
        title: "Eliminar taller",
        content: <ConfirmDeleteItemUIView workshopId={workshopId} />,
        width: "40vw",
        height: "auto",
      });
    },
    [openModal],
  );

  const openModalUpdateWorkshop = useCallback(
    (workshopValue?: WorkshopRecord) => {
      if (!workshopValue) return;

      openModal({
        title: "Actualizar taller",
        content: <WorkhopsUpdateUI workshop={workshopValue} />,
        width: "40vw",
        height: "auto",
      });
    },
    [openModal],
  );

  return {
    workshop,
    openModalDeleteWorkshop,
    openModalUpdateWorkshop,
  };
};
