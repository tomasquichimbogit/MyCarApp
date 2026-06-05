import type { IUseMaintenanceUIHook } from "./MaintenanceUI.hook"

export const MaintenanceUIView = ({ maintenances }: IUseMaintenanceUIHook) => {
    return (
        <div>
            <div>
                Mantenimientos
            </div>
            {maintenances.map((maintenance) => (
                <div key={maintenance.id}>
                    <h1>{maintenance.vehiclePlate}</h1>
                    <h1>{maintenance.description}</h1>
                    <h1>{maintenance.date}</h1>
                    <h1>{maintenance.mileage}</h1>
                    <h1>{maintenance.cost}</h1>
                </div>
            ))}
        </div>
    )
}
