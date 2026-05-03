import type { WorkshopRecord } from "@/services/taller.service";
import { WorkhopsUpdateUIView } from "./Workhops.view";
import { useWorkhopsUpdateUI } from "./Workhops.hook";

export interface IWorkhopsUpdateUIProps {
  workshop: WorkshopRecord;
}

export const WorkhopsUpdateUI = (props: IWorkhopsUpdateUIProps) => {
  const hook = useWorkhopsUpdateUI(props);
  return <WorkhopsUpdateUIView {...hook} />;
};
