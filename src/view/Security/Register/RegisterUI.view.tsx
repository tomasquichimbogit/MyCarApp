import { Button, FormInput } from "tomascomponents";
import { Button as ButtonAntd, Divider } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import type { IUseRegisterUIHook } from "./RegisterUI.hook";
import { IconShockAbsorberRow } from "@/assets/icons";
import { SecurityAuthLayout } from "../components";

export const RegisterView = ({ control, handleNavigateToLogin }: IUseRegisterUIHook) => {
  return (
    <SecurityAuthLayout title="Registrarme" icon={<UserAddOutlined style={{ fontSize: 32 }} />}>
      <FormInput name="email" label="Email" control={control} placeholder="Email" type="email" required />
      <FormInput name="password" label="Password" control={control} placeholder="Password" type="password" required />
      <FormInput name="name" label="Nombre" control={control} placeholder="Nombre" required />
      <div className="flex flex-col gap-2">
        <Button title="Registrarme" onClick={() => {}} />
        <Divider />
        <ButtonAntd type="link" onClick={handleNavigateToLogin}>
          <div className="flex flex-row items-center">
            <IconShockAbsorberRow className="size-18 text-orange-rally" rotate={-90} />
            <span className="text-orange-rally">Volver a Iniciar sesión</span>
          </div>
        </ButtonAntd>
      </div>
    </SecurityAuthLayout>
  );
};
