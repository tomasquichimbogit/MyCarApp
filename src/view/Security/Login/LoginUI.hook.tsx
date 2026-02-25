import { useState } from "react";
import { signIn } from "../../../services/auth.service";

export interface ILoginUI {
    email: string;
    password: string;
    message: string;
    isLoading: boolean;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    onSubmit: () => Promise<void>;
}


export const useLoginUI = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        if (!email || !password) {
            setMessage("Completa email y password.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        const { data, error } = await signIn(email, password);
        if (error) {
            setMessage(error.message);
            setIsLoading(false);
            return;
        }

        const accessToken = data.session?.access_token ?? "";
        if (!accessToken) {
            setMessage("No se pudo crear sesion.");
            setIsLoading(false);
            return;
        }

        localStorage.setItem("token", accessToken);
        window.location.href = "/";
    };

    return {
        email,
        password,
        message,
        isLoading,
        setEmail,
        setPassword,
        onSubmit,
    };
};