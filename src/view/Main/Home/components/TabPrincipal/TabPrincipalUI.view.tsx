import type { ITabPrincipalUI } from "./TabPrincipalUI.hook";
import { Tab } from "tomascomponents";
export const TabPrincipalUIView = ({ items }: ITabPrincipalUI) => {
  return <Tab items={items} type="card" />;
};