import { IconShockAbsorberRow } from "@/assets/icons";
import { FormInput, Button } from "tomascomponents";
import type { IUseLoginUIHook } from "./LoginUI.hook";
import { Button as ButtonAntd, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SecurityAuthLayout } from "../components";

export const LoginView = ({ control, handleNavigateToRegister, isPending, handleNavigateToForgotPassword, handleFormSubmit }: IUseLoginUIHook) => {
  return (
    <SecurityAuthLayout title="Iniciar sesión" icon={<UserOutlined style={{ fontSize: 32 }} />}>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-0.5">
          <FormInput name="email" label="Email" control={control} placeholder="Email" type="email" required />
          <FormInput
            name="password"
            label="Password"
            control={control}
            placeholder="Password"
            type="password"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button title="Iniciar sesión" onClick={handleFormSubmit} loading={isPending} />
          <Divider />
          <ButtonAntd type="link" onClick={handleNavigateToRegister} loading={isPending}>
            <div className="flex flex-row items-center">
              <span className="text-orange-rally">Registrarme</span>
              <IconShockAbsorberRow className="size-18 text-orange-rally" rotate={90} />
            </div>
          </ButtonAntd>
          <ButtonAntd type="link" onClick={handleNavigateToForgotPassword} loading={isPending}>
            <span className="text-white">Olvidé mi contraseña</span>
          </ButtonAntd>
        </div>
      </div>
    </SecurityAuthLayout>
  );
};
