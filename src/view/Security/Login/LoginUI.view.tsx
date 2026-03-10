import { Button, FormInput } from "tomascomponents";
import type { ILoginUI } from "./LoginUI.hook";
import { IconCarSuv } from "../../../assets";
import { Moon, Sun } from "lucide-react";
import { Button as ButtonAntd } from "antd";

export const LoginUIView = ({
  control,
  handleFormSubmit,
  isSignInPending,
  visiblePassword,
  toggleMode,
  mode,
}: ILoginUI) => {

  return (
    <div className=" flex flex-col items-center justify-center w-full min-h-screen pr-2 pl-2">
      <div className="w-full md:w-[500px] gap-2 border-gray-300 border-2 rounded-4xl p-4">
        <form className="flex flex-col items-center justify-center w-full gap-2">
          <div className="flex justify-end w-full">
            {/* <Button onClick={toggleMode} title={mode === "dark" ? "Light mode" : "Dark mode"} /> */}
            <ButtonAntd onClick={toggleMode} variant="outlined">
              {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="ml-1">{mode === "dark" ? "Light" : "Dark"}</span>
            </ButtonAntd>
          </div>
          <div className="flex flex-col items-center justify-center gap-0 rotate-12 mb-2">
            <IconCarSuv width={100} height={100} color={mode === "dark" ? "white" : "black"} />
            <div className="w-full h-0.5 -mt-6" />
          </div>
          <div className="w-full md:w-[400px]">
            <FormInput label="Email" control={control} name="email" placeholder="Email" />
          </div>
          <div className="w-full md:w-[400px]">
            <FormInput type={visiblePassword ? "text" : "password"} label="Password" control={control} name="password" placeholder="Password" />
          </div>
          <div className="flex justify-center pt-4 w-full">
            <Button onClick={handleFormSubmit} title="Login" loading={isSignInPending} />
          </div>
        </form>
      </div>
    </div>

  );
};