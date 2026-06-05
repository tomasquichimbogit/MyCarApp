
import type { IRegisterUserForm } from "./interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { useThemeMode, type ThemeMode } from "@/hooks/useThemeMode";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";
import { registerSchema } from "./interface";
import { useNotify } from "tomascomponents";
import { normalizeErrorForm } from "@/helper";
import React from "react";

export interface IUseRegisterUIHook {
    control: Control<IRegisterUserForm>;
    mode: ThemeMode;
    toggleMode: () => void;
    handleNavigateToLogin: () => void;
    handleFormSubmit: () => void;
}



export const useRegisterUI = (): IUseRegisterUIHook => {
    const { mode, toggleMode } = useThemeMode();
    const { notify } = useNotify();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<IRegisterUserForm>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const handleNavigateToLogin = () => {
        navigate(PATHS.login);
    }

    const onSubmit = (data: IRegisterUserForm) => {
        console.log(data);
    }

    const handleFormSubmit = () => {
        handleSubmit(onSubmit,(erros)=>{
            const messages = normalizeErrorForm(erros);
            notify("error", {
                title: "Error al registrar el usuario",
                description: React.createElement(
                    "span",
                    null,
                    ...messages.flatMap((msg, i) =>
                        i < messages.length - 1
                            ? [msg, React.createElement("br", { key: i })]
                            : [msg]
                    )
                ),
            });
        })();
    }

    return {
        control,
        mode,
        toggleMode,
        handleNavigateToLogin,
        handleFormSubmit,
    }
}