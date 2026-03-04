import { TabPrincipalUIView } from "./TabPrincipalUI.view";
import { useTabPrincipalUI } from "./TabPrincipalUI.hook";

export const TabPrincipalUI = () => {
  const hook = useTabPrincipalUI();
  return <TabPrincipalUIView {...hook} />;
};