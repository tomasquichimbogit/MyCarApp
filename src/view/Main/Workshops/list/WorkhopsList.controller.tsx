import { WorkhopsListUIView } from "./WorkhopsList.view";
import { useWorkhopsListUI } from "./WorkhopsList.hook";

export const WorkhopsListUI = () => {
  const hook = useWorkhopsListUI();
  return <WorkhopsListUIView {...hook} />;
};
