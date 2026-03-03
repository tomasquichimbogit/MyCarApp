import { useForm, type Control } from "react-hook-form";
import type { ILoginForm } from "./interface";
import { loginFormSchema } from "./loginForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInMutation } from "../../../services/auth.service";
import { requestForToken } from "../../../firebaseConfig";
import { useState } from "react";
import { useAppNavigation } from "../../../hooks/useAppNavigation.hook";

export interface ILoginUI {
    control: Control<ILoginForm>;
    handleFormSubmit: () => void;
    isSignInPending: boolean;
    visiblePassword: boolean;
    setVisiblePassword: (visible: boolean) => void;
}
export const useLoginUI = (): ILoginUI => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const { mutateAsync: signInMutate, isPending: isSignInPending } = useSignInMutation();
    const { navigateTo } = useAppNavigation();

    const methods = useForm<ILoginForm>({
        resolver: zodResolver(loginFormSchema),
    });

    const { control, handleSubmit } = methods;

    const onSubmit = async (data: ILoginForm) => {
        
        const { data: signInData, error } = await signInMutate({
            email: data.email,
            password: data.password,
        });

        if (error) {
            console.log(error.message);
            return;
        }

        const accessToken = signInData.session?.access_token ?? "";
        if (!accessToken) {
            console.log("No se pudo crear sesion.");
            return;
        }

        localStorage.setItem("token", accessToken);

        try {
            const fcmToken = await requestForToken();
            if (fcmToken) {
                localStorage.setItem("fcm_token", fcmToken);
            }
        } catch (error) {
            console.log("No se pudo obtener token de notificaciones", error);
        }

        navigateTo("/", true);
    }

    const handleFormSubmit = () => {
        handleSubmit(onSubmit, (errors) => {
            console.log(errors);
        })();
    };


    return { control, handleFormSubmit, isSignInPending, visiblePassword, setVisiblePassword };
}
