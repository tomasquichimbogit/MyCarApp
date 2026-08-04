import type { IUseVehiclesListUIHook } from "./VehiclesListUI.hook";
import { Empty, Spin } from "antd";

export const VehiclesListUIView = ({ vehicles, isLoading }: IUseVehiclesListUIHook) => {
  return <div>
    <h1>Vehículos</h1>
    <div>
        {isLoading && <Spin />}
        {!isLoading && vehicles.length === 0 && <Empty description="No hay vehículos para mostrar" />}
        {!isLoading && vehicles.length > 0 && (    
            <div>
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id}>{vehicle.brand}</div>
                ))}
            </div>
        )}
    </div>
  </div>;
};