import type { WorkshopRecord } from "@/services/taller.service";
import { WorkshopItemUIView } from "./WorkshopItemUI.view";
import { useWorkshopItemUI } from "./WorkshopItemUI.hook";

export interface IWorkshopItemUIProps {
  workshop: WorkshopRecord;
}

export const WorkshopItemUI = (props: IWorkshopItemUIProps) => {
  const hook = useWorkshopItemUI(props);
  return <WorkshopItemUIView {...hook} />;
};
