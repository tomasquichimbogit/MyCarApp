import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import type { IUseVehiclesUIHook } from "./VehiclesUI.hook";
import { ItemVehicleUI } from "./components/ItemVehicleUI.view";

export const VehiclesUIView = ({ vehicles }: IUseVehiclesUIHook) => {
  return (
    <CentralContainerUI title="Mis vehículos">
      <div className="flex w-full flex-col gap-4">
        {vehicles.map((vehicle) => (
          <ItemVehicleUI key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </CentralContainerUI>
  );
};
