import { Moon, Sun, ArrowLeft, MailCheck } from "lucide-react";
import { Button, FormInput } from "tomascomponents";
import logoUrl from "../../../assets/logo.png";
import { Button as ButtonAntd } from "antd";
import type { IVerifyEmailUI } from "./VerifyEmailUI.hook";

export const VerifyEmailUIView = ({
  control,
  handleFormSubmit,
  isVerifyPending,
  toggleMode,
  mode,
  handleNavigate,
  isProcessingLink,
}: IVerifyEmailUI) => {
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
              <p className="text-sm text-gray-500 mb-2 text-center">
                {isProcessingLink
                  ? "Confirmando tu correo..."
                  : "Ingresa el código que te enviamos por correo para activar tu cuenta."}
              </p>
              {!isProcessingLink && (
                <>
                  <FormInput label="Email" control={control} name="email" placeholder="Email" />
                  <FormInput
                    label="Código"
                    control={control}
                    name="verificationCode"
                    placeholder="Código de confirmación"
                  />
                </>
              )}
            </div>
          </div>
          {!isProcessingLink && (
            <div className="flex flex-col gap-2 w-full justify-center items-center">
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <Button
                  variant="solid"
                  onClick={handleFormSubmit}
                  color="primary"
                  title={
                    <div className="flex items-center gap-2">
                      <MailCheck className="w-4 h-4" />
                      <span>Verificar correo</span>
                    </div>
                  }
                  loading={isVerifyPending}
                />

                <Button
                  type="link"
                  title={
                    <div className="flex flex-row items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Iniciar sesión
                    </div>
                  }
                  onClick={handleNavigate}
                  variant="link"
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
