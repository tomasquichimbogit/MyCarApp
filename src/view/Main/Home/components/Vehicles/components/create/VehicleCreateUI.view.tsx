import { FormInput } from "tomascomponents";
import type { IVehicleCreateUI } from "./VehicleCreateUI.hook";
import { Form } from "react-hook-form";
import { CustomFooterModal } from "../../../../../../../components/Render/CustomFooterModal";

export const VehicleCreateUIView = ({ control, handleFormSubmit, closeModal, loading }: IVehicleCreateUI) => {
    return (
        <div className="flex h-full w-full max-w-full min-h-0 flex-col gap-2 overflow-x-hidden md:w-[40vw]">
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1">
                <Form onSubmit={handleFormSubmit} control={control}>
                    <FormInput label="Placa" name="placa" placeholder="Placa" control={control} />
                    <FormInput label="Marca" name="marca" placeholder="Marca" control={control} />
                    <FormInput label="Modelo" name="modelo" placeholder="Modelo" control={control} />
                    <FormInput label="Año" name="anio" placeholder="Año" control={control} />
                    <FormInput label="Color" name="color" placeholder="Color" control={control} />
                    <FormInput label="Propietario ID" name="propietario_id" placeholder="Propietario ID" control={control} />
                </Form>
            </div>
            <CustomFooterModal onCancel={closeModal} onConfirm={handleFormSubmit} loading={loading} />
        </div>
    )
}