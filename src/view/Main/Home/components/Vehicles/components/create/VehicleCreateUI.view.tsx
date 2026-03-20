import { FormInput, FormNumberInput, FormSelect } from "tomascomponents";
import type { IVehicleCreateUI } from "./VehicleCreateUI.hook";
import { Form } from "react-hook-form";
import { CustomFooterModal } from "../../../../../../../components/Render/CustomFooterModal";

export const VehicleCreateUIView = ({ control, handleFormSubmit, closeModal, loading, brandsOptions, modelsOptions, colorsOptions }: IVehicleCreateUI) => {
    return (
      <div className="flex h-full w-full max-w-full min-h-0 flex-col gap-2 overflow-x-hidden md:w-[40vw]">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1">
          <Form onSubmit={handleFormSubmit} control={control}>
            <FormInput label="Placa" name="placa" placeholder="Placa" control={control} />
            <FormSelect label="Marca" name="marca" placeholder="Marca" control={control} options={brandsOptions} />
            <FormSelect label="Modelo" name="modelo" placeholder="Modelo" control={control} options={modelsOptions} />
            <FormNumberInput label="Año" name="anio" placeholder="Año" control={control} />
            <FormSelect label="Color" name="color" placeholder="Color" control={control} options={colorsOptions} />
            <FormInput label="Propietario ID" name="propietario_id" placeholder="Propietario ID" control={control} />
          </Form>
        </div>
        <CustomFooterModal onCancel={closeModal} onConfirm={handleFormSubmit} loading={loading} />
      </div>
    );
}