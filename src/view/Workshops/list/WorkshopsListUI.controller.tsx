import { useWorkshopsListUIHook } from "./WorkshopsListUI.hook";
import { WorkshopsListView } from "./WorkshopsListUI.view";

export const WorkshopsListUI = () => {
  const hook = useWorkshopsListUIHook();

  return <WorkshopsListView {...hook} />;
};