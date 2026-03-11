import { Button, Form, FormInput } from "tomascomponents";
import type { IVehicleCreateUI } from "./VehicleCreateUI.hook";

export const VehicleCreateUIView = ({ control, handleFormSubmit }: IVehicleCreateUI) => {
    return (
        <div className="flex flex-col gap-2 md:min-w-[60vw] min-w-[60vw]">
            <h1>Vehicle Create</h1>
            <Form >
                <form onSubmit={handleFormSubmit}>
                    <FormInput label="Placa" name="placa" placeholder="Placa" control={control} />
                    <FormInput label="Marca" name="marca" placeholder="Marca" control={control} />
                    <FormInput label="Modelo" name="modelo" placeholder="Modelo" control={control} />
                    <FormInput label="Año" name="anio" placeholder="Año" control={control} />
                    <FormInput label="Color" name="color" placeholder="Color" control={control} />
                    <FormInput label="Propietario ID" name="propietario_id" placeholder="Propietario ID" control={control} />
                    <Button onClick={handleFormSubmit} title="Crear Vehiculo" type="primary" />
                </form>
            </Form>
        </div>
    )
}