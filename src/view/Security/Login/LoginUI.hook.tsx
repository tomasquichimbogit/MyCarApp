import { useForm, type Control } from "react-hook-form";
import type { ILoginForm } from "./interface";
import { loginFormSchema } from "./loginForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInMutation } from "../../../services/auth.service";

export interface ILoginUI {
    control: Control<ILoginForm>;
    handleFormSubmit: () => void;
    isSignInPending: boolean;
}
export const useLoginUI = (): ILoginUI => {
    
    const { mutateAsync: signInMutate, isPending: isSignInPending } = useSignInMutation();

    const methods = useForm<ILoginForm>({
        resolver: zodResolver(loginFormSchema),
    });

    const { control, handleSubmit } = methods;

    const onSubmit = async (data: ILoginForm) => {
        const { data: signInData, error } = await signInMutate(data);
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
        window.location.href = "/";
    }

    const handleFormSubmit = () => {
        handleSubmit(onSubmit, (errors) => {
            console.log(errors);
        })();
    };
    return { control, handleFormSubmit, isSignInPending };
}
