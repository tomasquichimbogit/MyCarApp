import fondoLogin from "@/assets/images/fondo-login-1.jpg";
import { Button, FormInput } from "tomascomponents";
import { Button as ButtonAntd } from "antd";
import { Sun, Moon, Wrench } from "lucide-react";
import { CarOutlined, UserOutlined, SnippetsOutlined } from "@ant-design/icons";
import type { IUseRegisterUIHook } from "./RegisterUI.hook";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const RegisterView = ({ control, mode, toggleMode, handleNavigateToLogin }: IUseRegisterUIHook) => {
    return (
      <div className="grid h-screen w-screen grid-rows-[35vh_1fr] md:grid-rows-1 md:grid-cols-2">
        <div
          className="order-1 md:order-2 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${fondoLogin})` }}
        >
          <div className="flex flex-col gap-2 min-h-0 flex-1 h-full">
            <div className="flex items-center justify-center h-[20%]">
              <span className="text-4xl font-bold text-black">MyCarApp</span>
            </div>
            <div className="flex flex-col gap-0.5 items-center justify-center min-h-0 flex-1 h-[80%] p-4">
              <div className="grid grid-cols-4 gap-4 w-full items-center justify-center bg-white/10 rounded-3xl">
                <div className="col-span-1 flex">
                  <CarOutlined style={{ fontSize: 40, color: "white" }} />
                </div>
                <div className="col-span-3">
                  <span className="font-bold text-white">Gestiona tus vehículos</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 w-full items-center justify-center bg-white/10 rounded-3xl">
                <div className="col-span-1 flex">
                  <Wrench className="w-10 h-10 text-white" />
                </div>
                <div className="col-span-3">
                  <span className="font-bold text-white">Gestiona tus talleres</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 w-full items-center justify-center bg-white/10 rounded-3xl">
                <div className="col-span-1 flex">
                  <SnippetsOutlined style={{ fontSize: 40, color: "white" }} />
                </div>
                <div className="col-span-3">
                  <span className="font-bold text-white">Gestiona tus mantenimientos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-2 md:order-1 flex flex-col items-center rounded-t-3xl md:rounded-none  md:mt-0 relative z-10">
          <div className="flex justify-end w-full pt-2 pr-2">
            <ButtonAntd onClick={toggleMode} variant="outlined">
              {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="ml-1">{mode === "dark" ? "Light" : "Dark"}</span>
            </ButtonAntd>
          </div>
          <div className="flex flex-col min-h-0 flex-1 h-full w-full justify-center items-center">
            <div className="flex flex-col gap-4 w-full max-w-md border rounded-lg p-4">
              <div className="flex items-center justify-center rounded-full">
                <UserOutlined style={{ fontSize: 32 }} />
              </div>
              <div className="text-2xl font-bold text-center">Registrate</div>
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
              <ButtonAntd type="link" onClick={handleNavigateToLogin}>
                <ArrowLeftOutlined className="ml-2" />
                Iniciar sesión
              </ButtonAntd>
            </div>
          </div>
        </div>
      </div>
    );
}