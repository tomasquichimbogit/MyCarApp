import { useForm, type Control } from "react-hook-form";
import { registerUserFormSchema, type IRegisterUserForm } from "./interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeMode } from "../../../provider/Provider";
import { useState } from "react";
import { useAppNavigation } from "../../../hooks/useAppNavigation.hook";
import { PATHS } from "@/router/paths";
import { useSignUpMutation } from "../../../services/auth.service";
import { useNotify } from "tomascomponents";
import { useAuthStore } from "../../../store/useAuthStore";

export interface IRegisterUserUI {
  control: Control<IRegisterUserForm>;
  handleFormSubmit: () => void;
  isSignInPending: boolean;
  visiblePassword: boolean;
  setVisiblePassword: (visible: boolean) => void;
  toggleMode: () => void;
  mode: "light" | "dark";
  handleNavigate: () => void;
}
export const useRegisterUserUI = (): IRegisterUserUI => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { mode, toggleMode } = useThemeMode();
  const { navigateTo } = useAppNavigation();
  const { notify } = useNotify();
  const { setToken } = useAuthStore();
  const { mutate: signUpMutate, isPending: isSignUpPending } = useSignUpMutation();
  const methods = useForm<IRegisterUserForm>({
    resolver: zodResolver(registerUserFormSchema),
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: IRegisterUserForm) => {
    signUpMutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          if (response.session?.access_token) {
            setToken(response.session.access_token);
            notify("success", {
              title: "Registro exitoso",
            });
            navigateTo(PATHS.home, true);
            return;
          }

          notify("success", {
            title: "Te enviamos un código de confirmación al correo",
          });
          navigateTo(`${PATHS.verifyEmail}?email=${encodeURIComponent(data.email)}`);
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
    navigateTo(PATHS.login);
  };

  return {
    control,
    handleFormSubmit,
    isSignInPending: isSignUpPending,
    visiblePassword,
    setVisiblePassword,
    toggleMode,
    mode,
    handleNavigate,
  };
};
