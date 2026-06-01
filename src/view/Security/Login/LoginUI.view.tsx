import fondoLogin from "@/assets/images/fondo-login-5.png";
import { Button, FormInput } from "tomascomponents";
import type { IUseLoginUIHook } from "./LoginUI.hook";
import { Button as ButtonAntd } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Sun, Moon } from "lucide-react";
import { UserOutlined } from "@ant-design/icons";
import { IconCarSuv } from "@/assets/svg";
import { IconMotorcycle } from "@/assets/svg";

export const LoginView = ({ control, mode, toggleMode, handleNavigateToRegister }: IUseLoginUIHook) => {
  return (
    <div className="grid h-screen w-screen grid-rows-[35vh_1fr] md:grid-rows-1 md:grid-cols-2 bg-carbon-black">
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
          <ButtonAntd onClick={toggleMode} variant="outlined">
            {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="ml-1">{mode === "dark" ? "Light" : "Dark"}</span>
          </ButtonAntd>
        </div>
        <div className="flex flex-col min-h-0 flex-1 h-full w-full justify-center items-center">
          <div className="flex flex-col gap-4 w-full max-w-md border rounded-2xl p-4">
            <div className="flex items-center justify-center rounded-full text-orange-rally">
              <UserOutlined style={{ fontSize: 32 }} />
            </div>
            <div className="text-2xl font-bold text-center text-orange-rally">Iniciar sesión</div>
            <FormInput name="email" label="Email" control={control} placeholder="Email" type="email" required />
            <FormInput
              name="password"
              label="Password"
              control={control}
              placeholder="Password"
              type="password"
              required
            />
            <Button title="Login" onClick={() => {}} />
            <ButtonAntd type="link" onClick={handleNavigateToRegister}>
              Registrarme
              <ArrowRightOutlined className="ml-2" />
            </ButtonAntd>
          </div>
        </div>
      </div>
    </div>
  );
};
