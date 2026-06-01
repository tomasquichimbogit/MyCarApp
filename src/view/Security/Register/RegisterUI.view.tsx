import fondoLogin from "@/assets/images/fondo-login-5.png";
import { Button, FormInput } from "tomascomponents";
import { Button as ButtonAntd } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import type { IUseRegisterUIHook } from "./RegisterUI.hook";
import { IconCarSuv, IconMotorcycle } from "@/assets/svg";
import { IconShockAbsorberRow } from "@/assets/icons";

export const RegisterView = ({ control, handleNavigateToLogin }: IUseRegisterUIHook) => {
  return (
    <div className="grid h-screen w-screen grid-rows-[35vh_1fr] md:grid-rows-1 md:grid-cols-2 bg-blue-bodywork">
      <div
        className="order-1 md:order-2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondoLogin})` }}
      >
        <div className="flex flex-col gap-2 min-h-0 flex-1 h-full"></div>
      </div>
      <div className="order-2 md:order-1 flex flex-col items-center rounded-t-4xl md:rounded-none  md:mt-0 relative z-10">
        <div className="flex justify-between w-full pt-2 pr-2">
          <div className="flex items-center gap-2 pl-2">
            <span className="font-bold text-orange-rally">MotCarApp</span>
            <IconCarSuv className="w-10 h-10 text-desert-sand" transform="scale(-1, 1)" />
            <IconMotorcycle className="w-7 h-7 text-desert-sand" />
          </div>
        </div>
        <div className="flex flex-col min-h-0 flex-1 h-full w-full justify-center items-center">
          <div className="flex flex-col gap-4 w-full max-w-md border border-orange-rally rounded-2xl p-4">
            <div className="flex items-center justify-center rounded-full text-orange-rally">
              <UserAddOutlined style={{ fontSize: 32 }} />
            </div>
            <div className="text-2xl font-bold text-center text-orange-rally">Registrarme</div>
            <FormInput name="email" label="Email" control={control} placeholder="Email" type="email" required />
            <FormInput
              name="password"
              label="Password"
              control={control}
              placeholder="Password"
              type="password"
              required
            />
            <div className="flex flex-col gap-2">
              <Button title="Registrarme" onClick={() => {}} />
              <ButtonAntd type="link" onClick={handleNavigateToLogin}>
                <div className="flex flex-row items-center">
                  <IconShockAbsorberRow className="size-18 text-orange-rally" rotate={-90} />
                  <span className="text-orange-rally">Volver a Iniciar sesión</span>
                </div>
              </ButtonAntd>
            </div>
          </div>
        </div>
        <div className="flex felx-row gap-2 items-center justify-center text-desert-sand">
          <small className="">Gestión de Vehículos</small>-<small className="">Mantenimientos</small>-
          <small className="">Talleres</small>
        </div>
      </div>
    </div>
  );
};
