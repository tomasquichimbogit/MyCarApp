import { WorkhopsFormUIView } from "./WorkhopsFormUI.view";
import { useWorkhopsFormUI, type IWorkhopsFormUIProps } from "./WorkhopsFormUI.hook";

export const WorkhopsFormUI = (props: IWorkhopsFormUIProps) => {
  const hook = useWorkhopsFormUI(props);
  return <WorkhopsFormUIView {...hook} />;
};
