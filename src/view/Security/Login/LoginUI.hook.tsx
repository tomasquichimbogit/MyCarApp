import type { ILoginForm } from "./interface";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useThemeMode, type ThemeMode } from "@/hooks/useThemeMode";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";
import { useSignIn } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { LOCAL_STORAGE_KEYS } from "@/constants";

const loginSchema = z.object({
  email: z.string({ error: "Email es requerido" }).email("Email inválido"),
  password: z.string({ error: "Contraseña es requerida" }).min(6, "La contraseña debe tener al menos 8 caracteres"),
});

export interface IUseLoginUIHook {
  control: Control<ILoginForm>;
  mode: ThemeMode;
  toggleMode: () => void;
  handleNavigateToRegister: () => void;
  handleNavigateToForgotPassword: () => void;
  handleFormSubmit: () => void;
  isPending: boolean;
}

export const useLoginUI = (): IUseLoginUIHook => {
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { mutate: signIn, isPending } = useSignIn();
  const { control, handleSubmit } = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleNavigateToRegister = () => {
    navigate(PATHS.registerUser);
  };

  const handleNavigateToForgotPassword = () => {
    navigate(PATHS.recoveryPassword);
  };

  const onSubmit = (data: ILoginForm) => {
    signIn(data, {
      onSuccess: (response) => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.session.refresh_token);
        setUser(response);
        navigate(PATHS.home, { replace: true });
      },
    });
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return {
    control,
    mode,
    toggleMode,
    handleNavigateToRegister,
    handleNavigateToForgotPassword,
    handleFormSubmit,
    isPending,
  };
};
