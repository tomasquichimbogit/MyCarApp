import type { IUseHomeUI } from "./HomeUI.hook";
import { TabPrincipalUI } from "./components/TabPrincipal/TabPrincipalUI.controller";

export const HomeUIView = ({ tokenFcm }: IUseHomeUI) => {
  console.log(tokenFcm);
  return (
    <div className="rounded-lg p-2">
      <TabPrincipalUI />
    </div>
  );
};
