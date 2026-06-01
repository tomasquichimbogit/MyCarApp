import type { ILoginForm } from "./interface";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useThemeMode, type ThemeMode } from "@/hooks/useThemeMode";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});


export interface IUseLoginUIHook {
    control: Control<ILoginForm>;
    mode: ThemeMode;
    toggleMode: () => void;
    handleNavigateToRegister: () => void;
    handleNavigateToForgotPassword: () => void;
}

export const useLoginUI = (): IUseLoginUIHook => {
    const { mode, toggleMode } = useThemeMode();
    const navigate = useNavigate();

    const {control} = useForm<ILoginForm>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const handleNavigateToRegister = () => {
        navigate(PATHS.registerUser);
    }

    const handleNavigateToForgotPassword = () => {
        navigate(PATHS.recoveryPassword);
    }


    return {
        control,
        mode,
        toggleMode,
        handleNavigateToRegister,
        handleNavigateToForgotPassword,
    }
}