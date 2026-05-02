import { useForm, type Control } from "react-hook-form";
import type { ILoginForm } from "./interface";
import { loginFormSchema } from "./loginForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInMutation } from "../../../services/auth.service";
import { useThemeMode } from "../../../provider/Provider";
import { useState } from "react";
import { useNotify } from "tomascomponents";
export interface ILoginUI {
  control: Control<ILoginForm>;
  handleFormSubmit: () => void;
  isSignInPending: boolean;
  visiblePassword: boolean;
  setVisiblePassword: (visible: boolean) => void;
  toggleMode: () => void;
  mode: "light" | "dark";
}
export const useLoginUI = (): ILoginUI => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { mutate: signInMutate, isPending: isSignInPending } = useSignInMutation();
  const { notify } = useNotify();
  const { mode, toggleMode } = useThemeMode();

  const methods = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: ILoginForm) => {
    signInMutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          console.log('onSuccess =>');
          // navigateTo("/", true);
          notify("success", {
            title: "Login successful",
          });
        }
      },
    );
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, (errors) => {
      console.log(errors);
    })();
  };

  return { control, handleFormSubmit, isSignInPending, visiblePassword, setVisiblePassword, toggleMode, mode };
};
