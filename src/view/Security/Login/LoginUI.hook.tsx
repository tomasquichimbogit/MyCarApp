import { useForm, type Control } from "react-hook-form";
import type { ILoginForm } from "./interface";
import { loginFormSchema } from "./loginForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "../../../services/auth.service";
import { useThemeMode } from "../../../provider/Provider";
import { useState } from "react";
import { useNotify } from "tomascomponents";
import { useAppNavigation } from "../../../hooks/useAppNavigation.hook";
import { useAuthStore } from "../../../store/useAuthStore";
import { PATHS } from "@/router/paths";

export interface ILoginUI {
  control: Control<ILoginForm>;
  handleFormSubmit: () => void;
  isSignInPending: boolean;
  visiblePassword: boolean;
  setVisiblePassword: (visible: boolean) => void;
  toggleMode: () => void;
  mode: "light" | "dark";
  handleNavigate: () => void;
}
export const useLoginUI = (): ILoginUI => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { mutate: signInMutate, isPending: isSignInPending } = useSignIn();
  const { notify } = useNotify();
  const { mode, toggleMode } = useThemeMode();
  const { navigateTo } = useAppNavigation();
  const { setToken } = useAuthStore();
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
        onSuccess: (data) => {
          if (data.session?.access_token) {
            setToken(data.session.access_token);
          }
          notify("success", {
            title: "Login successful",
          });
          navigateTo("/", true);
        },
      },
    );
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit, (errors) => {
      console.log(errors);
    })();
  };

  const handleNavigate = () => {
    navigateTo(PATHS.registerUser);
  };

  return {
    control,
    handleFormSubmit,
    isSignInPending,
    visiblePassword,
    setVisiblePassword,
    toggleMode,
    mode,
    handleNavigate,
  };
};
