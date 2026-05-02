import { LoadingData } from "../../../../../components/Render/LoadingData";
import type { IVehiclesListUI } from "./VehiclesListUI.hook";
import { VehicleItemUI } from "./components/vehicle-item/VehicleItemUI.controller";
export const VehiclesListUIView = ({ vehicles, isLoadingVehicles }: IVehiclesListUI) => {
  return (
    <div>
      {isLoadingVehicles && <LoadingData loading={isLoadingVehicles} message="Cargando vehículos..."/>}
      {!isLoadingVehicles && vehicles.length > 0 && (
        <div>
          <div>
            
          </div>
          {vehicles.map((vehicle) => (
            <VehicleItemUI key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );    
};