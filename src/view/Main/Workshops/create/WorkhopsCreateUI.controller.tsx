import { WorkhopsCreateUIView } from "./WorkhopsCreateUI.view";
import { useWorkhopsCreateUI } from "./WorkhopsCreateUI.hook";

export const WorkhopsCreateUI = () => {
  const hook = useWorkhopsCreateUI();
  return <WorkhopsCreateUIView {...hook} />;
};
