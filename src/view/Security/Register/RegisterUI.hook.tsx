
import type { IRegisterUserForm } from "./interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, type Control } from "react-hook-form";
import { useThemeMode, type ThemeMode } from "@/hooks/useThemeMode";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";

export interface IUseRegisterUIHook {
    control: Control<IRegisterUserForm>;
    mode: ThemeMode;
    toggleMode: () => void;
    handleNavigateToLogin: () => void;
}

const registerSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const useRegisterUI = (): IUseRegisterUIHook => {
    const { mode, toggleMode } = useThemeMode();
    const navigate = useNavigate();
    const { control } = useForm<IRegisterUserForm>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const handleNavigateToLogin = () => {
        navigate(PATHS.login);
    }

    return {
        control,
        mode,
        toggleMode,
        handleNavigateToLogin,
    }
}