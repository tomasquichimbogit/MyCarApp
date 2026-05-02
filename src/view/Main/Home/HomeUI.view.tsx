import type { IUseHomeUI } from "./HomeUI.hook";
import { VehiclesListUI } from "./componentss/Vehicles/VehiclesListUI.controller";

export const HomeUIView = ({}: IUseHomeUI) => {
  return (
    <div className="rounded-lg p-2">
      <VehiclesListUI />
    </div>
  );
};
