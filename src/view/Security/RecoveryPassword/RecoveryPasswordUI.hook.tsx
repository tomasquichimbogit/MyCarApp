import { useEffect, useState } from "react";
import { supabase } from "../../../constants";

export interface IRecoveryPasswordUI {
    newPassword: string;
    confirmPassword: string;
    message: string;
    isLoading: boolean;
    setNewPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    recoveryPassword: () => Promise<void>;
}

export const useRecoveryPasswordUI = (): IRecoveryPasswordUI => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const initializeRecoverySession = async () => {
            const hash = window.location.hash.startsWith("#")
                ? window.location.hash.slice(1)
                : "";

            if (!hash) {
                return;
            }

            const params = new URLSearchParams(hash);
            const type = params.get("type");
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");

            if (type !== "recovery" || !accessToken || !refreshToken) {
                return;
            }

            const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            });

            if (error) {
                setMessage("El enlace de recuperacion no es valido o expiro.");
                return;
            }

            window.history.replaceState(
                {},
                document.title,
                `${window.location.pathname}${window.location.search}`
            );
        };

        void initializeRecoverySession();
    }, []);

    const recoveryPassword = async () => {
        if (!newPassword || !confirmPassword) {
            setMessage("Completa ambos campos.");
            return;
        }

        if (newPassword.length < 6) {
            setMessage("La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
            setMessage("Auth session missing. Abre el enlace del correo y vuelve a intentar.");
            setIsLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            setMessage(error.message);
            setIsLoading(false);
            return;
        }

        setMessage("Contrasena actualizada. Ya puedes iniciar sesion.");
        setIsLoading(false);
    };

    return {
        newPassword,
        confirmPassword,
        message,
        isLoading,
        setNewPassword,
        setConfirmPassword,
        recoveryPassword,
    };
};