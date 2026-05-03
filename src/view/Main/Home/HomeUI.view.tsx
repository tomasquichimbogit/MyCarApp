import { Tab } from "tomascomponents";
import type { IUseHomeUI } from "./HomeUI.hook";

export const HomeUIView = ({ itemsTabs }: IUseHomeUI) => {
  return (
    <div className="rounded-lg p-2">
      <Tab items={itemsTabs} type="card" />
    </div>
  );
};
