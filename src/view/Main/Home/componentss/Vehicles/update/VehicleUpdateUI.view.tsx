import { CustomFooterModal } from "@/components/Render/CustomFooterModal";
import { Form, FormInput, FormNumberInput, FormSelect } from "tomascomponents";
import type { IVehicleUpdateUI } from "./VehicleUpdateUI.hook";

export const VehicleUpdateUIView = ({ control, handleFormSubmit, brandsOptions, modelsOptions, colorsOptions, loading, closeModal }: IVehicleUpdateUI) => {
  return (
    <div className="flex h-full w-full max-w-full min-h-0 flex-col gap-2 overflow-x-hidden md:w-[40vw]">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1">
        <Form method="post">
          <FormInput label="Placa" name="placa" placeholder="Placa" control={control} minLength={1} maxLength={10} />
          <FormSelect label="Marca" name="marca" placeholder="Marca" control={control} options={brandsOptions} />
          <FormSelect label="Modelo" name="modelo" placeholder="Modelo" control={control} options={modelsOptions} />
          <FormNumberInput label="Año" name="anio" placeholder="Año" control={control} />
          <FormSelect label="Color" name="color" placeholder="Color" control={control} options={colorsOptions} />
        </Form>
      </div>
      <CustomFooterModal onConfirm={handleFormSubmit} onCancel={closeModal} loading={loading} />
    </div>
  );
};