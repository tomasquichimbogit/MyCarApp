import { CentralContainerUI } from "@/components/Render/CentralContainerUI";
import { Button, FormInput } from "tomascomponents";
import { Alert, Button as AntdButton, Popconfirm, Spin } from "antd";
import type { IUseUserInformationUIHook } from "./UserInformationUI.hook";

export const UserInformationUIView = ({
  control,
  isLoading,
  isError,
  isSubmitting,
  isDeleting,
  hasProfile,
  handleFormSubmit,
  handleDeleteProfile,
}: IUseUserInformationUIHook) => {
  if (isLoading) {
    return (
      <CentralContainerUI title="Mi información">
        <div className="flex justify-center py-10">
          <Spin spinning />
        </div>
      </CentralContainerUI>
    );
  }

  if (isError) {
    return (
      <CentralContainerUI title="Mi información">
        <Alert
          message="Error"
          description="No se pudo cargar tu información. Intenta de nuevo más tarde."
          type="error"
          showIcon
        />
      </CentralContainerUI>
    );
  }

  return (
    <CentralContainerUI
      title="Mi información"
      subtitle={
        hasProfile
          ? "Actualiza tus datos personales"
          : "Completa tu perfil para usar todas las funciones"
      }
    >
      <div className="flex flex-col gap-3 rounded-xl border border-desert-sand/40 bg-white p-4">
        <FormInput
          name="names"
          label="Nombres"
          control={control}
          placeholder="Nombres"
          required
        />
        <FormInput
          name="last_names"
          label="Apellidos"
          control={control}
          placeholder="Apellidos"
          required
        />
        <FormInput
          name="phone"
          label="Teléfono"
          control={control}
          placeholder="Teléfono"
          required
        />
        <FormInput
          name="email"
          label="Email"
          control={control}
          placeholder="Email"
          type="email"
          required
        />

        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            title={hasProfile ? "Guardar cambios" : "Crear perfil"}
            onClick={handleFormSubmit}
            loading={isSubmitting}
          />

          {hasProfile && (
            <Popconfirm
              title="Eliminar perfil"
              description="Esta acción eliminará tu información personal."
              okText="Eliminar"
              cancelText="Cancelar"
              okButtonProps={{ danger: true, loading: isDeleting }}
              onConfirm={handleDeleteProfile}
            >
              <AntdButton danger loading={isDeleting}>
                Eliminar perfil
              </AntdButton>
            </Popconfirm>
          )}
        </div>
      </div>
    </CentralContainerUI>
  );
};
