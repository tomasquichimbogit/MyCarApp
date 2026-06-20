import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormSimpleVehicleUI, type TSchemaFormSimpleVehicleUI } from "../form-simple/interface";
import { ETypeVehicle } from "@/enums";
import { Button, FormInput, FormNumberInput, FormSelect, useNotify } from "tomascomponents";
import { useModal } from "tomascomponents";
import { useFormController } from "@/hooks/useFormController";
import { useCreateMotorcycle, type ICreateMotorcyclePayload } from "@/services/vehicles/vehicles.services";
import { DEFAULT_IDS } from "@/constants";
import { COLOR_OPTIONS } from "@/constants/Colors";
import { Divider } from "antd";
import { useCurrentPerson } from "@/services/person/person.services";
import { useEffect } from "react";

export const VehicleCreateMotorcycleUIView = () => {
  const { closeModal } = useModal();
  const { notify } = useNotify();
  const { errorForm } = useFormController();
  const { mutate: createMotorcycle, isPending: isCreating } = useCreateMotorcycle();
  const { data: person, isLoading: isLoadingPerson, isError: isErrorPerson } = useCurrentPerson();
  const methods = useForm<TSchemaFormSimpleVehicleUI>({
    resolver: zodResolver(schemaFormSimpleVehicleUI),
    defaultValues: {
      type: ETypeVehicle.MOTORCYCLE,
    },
  });
  const { control, handleSubmit, setValue } = methods;

  

  useEffect(() => {
    if (person?.id) {
      setValue("person_id", person.id);
    }
  }, [person, setValue]);



  const onSubmit = (data: TSchemaFormSimpleVehicleUI) => {
    const payload: ICreateMotorcyclePayload = {
      ...data,
      brand: DEFAULT_IDS.BRAND,
      model: DEFAULT_IDS.MODEL,
      color: data.color ?? "",
      year: data.year ?? new Date().getFullYear(),
    };
    createMotorcycle(payload, {
      onSuccess: () => {
        closeModal();
        notify("success", {
          title: "Vehículo creado",
          description: "El vehículo se registró correctamente.",
        });
      },
    });
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, (errors)=>{
        console.log('errors =>',errors);
        errorForm(errors);
    })();
  };

  const handleSelectOtherColor = () => {
    setValue("color", "Otro");
  };

  const disabledForm = isLoadingPerson || isErrorPerson || isCreating;

  return (
    <div className="flex flex-col gap-3 p-2">
      <FormInput label="Placa" name="license_plate" placeholder="ABC-1234" control={control} required />
      <FormSelect
        label="Color"
        name="color"
        placeholder="Selecciona un color"
        control={control}
        options={COLOR_OPTIONS}
        popupRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <div className="flex flex-row gap-2 justify-end">
              <Button title="Otro color" onClick={handleSelectOtherColor} variant="outlined" />
            </div>
          </>
        )}
      />
      <FormNumberInput label="Año" name="year" placeholder="2026" control={control} required />
      <div className="flex flex-row gap-2 justify-end">
        <Button title="Cancelar" onClick={closeModal} variant="outlined" />
        <Button title="Guardar vehículo" onClick={handleFormSubmit} loading={isCreating} disabled={disabledForm} />
      </div>
    </div>
  );
};
