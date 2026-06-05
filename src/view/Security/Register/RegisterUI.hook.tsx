
import type { IRegisterUserForm } from "./interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { useThemeMode, type ThemeMode } from "@/hooks/useThemeMode";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";
import { registerSchema } from "./interface";
import { useFormController } from "@/hooks/useFormController";
import { useSignUpMutation } from "@/services/auth.service";

export interface IUseRegisterUIHook {
    control: Control<IRegisterUserForm>;
    mode: ThemeMode;
    toggleMode: () => void;
    handleNavigateToLogin: () => void;
    handleFormSubmit: () => void;
    isPendingSignUp: boolean;
}



export const useRegisterUI = (): IUseRegisterUIHook => {
    const { mode, toggleMode } = useThemeMode();
    const { errorForm } = useFormController();
    const { mutate: signUpMutation, isPending: isPendingSignUp } = useSignUpMutation();
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
        signUpMutation(data, {
            onSuccess: (response) => {
                navigate(PATHS.verifyEmail, { state: { email: response.user.email } });
            },
        });
    }

    const handleFormSubmit = () => {
        handleSubmit(onSubmit,errorForm)();
    }

    return {
        control,
        mode,
        toggleMode,
        handleNavigateToLogin,
        handleFormSubmit,
        isPendingSignUp,
    }
}