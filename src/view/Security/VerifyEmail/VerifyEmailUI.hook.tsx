import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";
import { useResendVerificationEmail } from "@/services/auth.service";
import { useNotify } from "tomascomponents";

export interface IUseVerifyEmailUIHook {
    email: string;
    handleResendEmail: () => void;
    handleNavigateToLogin: () => void;
    isPending: boolean;
}

export const useVerifyEmailUI = (): IUseVerifyEmailUIHook => {
    const navigate = useNavigate();
    const { notify } = useNotify();
    const location = useLocation();
    const email = (location.state as { email?: string })?.email ?? "";
    const { mutate: resendMutation, isPending } = useResendVerificationEmail();

    const handleNavigateToLogin = () => {
        navigate(PATHS.login);
    };

    const handleResendEmail = () => {
        if (!email) {
            notify("error", { title: "No se encontró el correo electrónico" });
            return;
        }
        resendMutation(email, {
            onSuccess: () => {
                notify("success", {
                    title: "Correo reenviado",
                    description: `Se ha reenviado el enlace de verificación a ${email}`,
                });
            },
            onError: () => {
                notify("error", { title: "Error al reenviar el correo de verificación" });
            },
        });
    };

    return {
        email,
        handleResendEmail,
        handleNavigateToLogin,
        isPending,
    };
};
