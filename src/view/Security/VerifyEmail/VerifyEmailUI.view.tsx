import { Moon, Sun, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import logoUrl from "../../../assets/logo.png";
import { Button as ButtonAntd } from "antd";
import type { IVerifyEmailUI } from "./VerifyEmailUI.hook";

export const VerifyEmailUIView = ({ status, toggleMode, mode }: IVerifyEmailUI) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex justify-end w-full p-2">
        <ButtonAntd onClick={toggleMode} variant="outlined">
          {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="ml-1">{mode === "dark" ? "Light" : "Dark"}</span>
        </ButtonAntd>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 border border-gray-800 rounded-4xl p-8 w-full md:w-[500px] text-center">
          <img
            src={logoUrl}
            alt="Logo"
            className="h-32 w-auto max-w-[400px] object-contain mx-auto rounded-md"
            draggable={false}
          />

          {status === "loading" && (
            <>
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-sm text-gray-500">Verificando tu correo...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <h1 className="text-xl font-semibold">Verificado correctamente</h1>
              <p className="text-sm text-gray-500">Tu cuenta ya está activa. Ya puedes iniciar sesión.</p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-12 h-12 text-red-500" />
              <h1 className="text-xl font-semibold">No se pudo verificar</h1>
              <p className="text-sm text-gray-500">
                El enlace no es válido o expiró. Regístrate de nuevo o solicita un nuevo correo.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
