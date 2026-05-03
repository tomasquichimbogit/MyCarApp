import { FormInput } from "tomascomponents";
import type { IWorkhopsFormUI } from "./WorkhopsFormUI.hook";

export const WorkhopsFormUIView = ({ control }: IWorkhopsFormUI) => {
  return (
    <>
      <FormInput label="Nombre" name="nombre" placeholder="Nombre del taller" control={control} minLength={1} maxLength={120} />
      <FormInput label="Dirección" name="direccion" placeholder="Dirección del taller" control={control} minLength={1} maxLength={150} />
      <FormInput label="Teléfono" name="telefono" placeholder="Teléfono" control={control} minLength={7} maxLength={20} />
      <FormInput label="Especialidad" name="especialidad" placeholder="Especialidad del taller" control={control} minLength={1} maxLength={100} />
    </>
  );
};
