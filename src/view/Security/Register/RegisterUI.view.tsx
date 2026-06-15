import { Button, FormInput } from "tomascomponents";
import { Button as ButtonAntd, Divider } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import type { IUseRegisterUIHook } from "./RegisterUI.hook";
import { IconShockAbsorberRow } from "@/assets/icons";
import { SecurityAuthLayout } from "../components";

export const RegisterView = ({ control, isPendingSignUp, handleNavigateToLogin, handleFormSubmit }: IUseRegisterUIHook) => {
  return (
    <SecurityAuthLayout title="Registrarme" icon={<UserAddOutlined style={{ fontSize: 32 }} />}>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-0.5">
          <FormInput name="email" label="Email" control={control} placeholder="Email" type="email" required />
          <FormInput
            name="password"
            label="Contraseña"
            control={control}
            placeholder="Contraseña"
            type="password"
            required
          />
          <FormInput
            name="confirmPassword"
            label="Confirmar Contraseña"
            control={control}
            placeholder="Confirmar Contraseña"
            type="password"
            required
          />
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <Button title="Registrarme" onClick={handleFormSubmit} loading={isPendingSignUp} />
          <Divider />
          <ButtonAntd type="link" onClick={handleNavigateToLogin}>
            <div className="flex flex-row items-center">
              <IconShockAbsorberRow className="size-18 text-led-yellow" rotate={-90} />
              <span className="text-orange-rally">Volver a Iniciar sesión</span>
            </div>
          </ButtonAntd>
        </div>
      </form>
    </SecurityAuthLayout>
  );
};
