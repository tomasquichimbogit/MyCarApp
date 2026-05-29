import { Button, FormInput } from "tomascomponents";
import type { ILoginUI } from "./LoginUI.hook";
import logoUrl from "../../../assets/logo.png";
import { Moon, Sun, User2, ArrowRight } from "lucide-react";
import { Button as ButtonAntd } from "antd";

export const LoginUIView = ({
  control,
  handleFormSubmit,
  isSignInPending,
  visiblePassword,
  toggleMode,
  mode,
  handleNavigate,
}: ILoginUI) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex justify-end w-full p-2">
        <ButtonAntd onClick={toggleMode} variant="outlined">
          {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="ml-1">{mode === "dark" ? "Light" : "Dark"}</span>
        </ButtonAntd>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center p-4">
        <form className="flex flex-col gap-2 border border-gray-800 rounded-4xl p-4 pb-12 w-full md:w-[500px]">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <img
              src={logoUrl}
              alt="Logo"
              className="h-32 w-auto max-w-[400px] object-contain mx-auto rounded-md"
              draggable={false}
            />
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="flex flex-col gap-0.5 w-full md:w-1/2">
              <FormInput label="Email" control={control} name="email" placeholder="Email" />
              <FormInput
                type={visiblePassword ? "text" : "password"}
                label="Password"
                control={control}
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full justify-center items-center">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <Button
                variant="solid"
                onClick={handleFormSubmit}
                color="primary"
                title={
                  <div className="flex items-center gap-2">
                    <User2 className="w-4 h-4" />
                    <span>Iniciar sesión</span>
                  </div>
                }
                loading={isSignInPending}
              />

              <Button
                type="link"
                title={
                  <div className="flex flex-row items-center gap-2">
                    Registrarse
                    <ArrowRight className="w-4 h-4" />
                  </div>
                }
                onClick={handleNavigate}
                variant="link"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
