import { useEffect, useState } from "react";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { useThemeMode } from "../../../provider/Provider";
import { useAppNavigation } from "../../../hooks/useAppNavigation.hook";
import { PATHS } from "@/router/paths";
import { useVerifySignupOtpMutation } from "../../../services/auth.service";
import { useNotify } from "tomascomponents";
import { useAuthStore } from "../../../store/useAuthStore";
import { SUPABASE } from "../../../constants";
import { verifyEmailFormSchema, type IVerifyEmailForm } from "./interface";

export interface IVerifyEmailUI {
  control: Control<IVerifyEmailForm>;
  handleFormSubmit: () => void;
  isVerifyPending: boolean;
  toggleMode: () => void;
  mode: "light" | "dark";
  handleNavigate: () => void;
  isProcessingLink: boolean;
}

export const useVerifyEmailUI = (): IVerifyEmailUI => {
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";
  const [isProcessingLink, setIsProcessingLink] = useState(() => {
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    if (!hash) return false;

    const params = new URLSearchParams(hash);
    return params.get("type") === "signup" && Boolean(params.get("access_token"));
  });
  const { mode, toggleMode } = useThemeMode();
  const { navigateTo } = useAppNavigation();
  const { notify } = useNotify();
  const { setToken } = useAuthStore();
  const { mutate: verifySignupOtpMutate, isPending: isVerifyPending } = useVerifySignupOtpMutation();

  const methods = useForm<IVerifyEmailForm>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      email: emailFromQuery,
      verificationCode: "",
    },
  });

  const { control, handleSubmit, setValue } = methods;

  useEffect(() => {
    if (emailFromQuery) {
      setValue("email", emailFromQuery);
    }
  }, [emailFromQuery, setValue]);

  useEffect(() => {
    const initializeSignupSession = async () => {
      const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";

      if (!hash) {
        return;
      }

      const params = new URLSearchParams(hash);
      const type = params.get("type");
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (type !== "signup" || !accessToken || !refreshToken) {
        setIsProcessingLink(false);
        return;
      }

      const { error } = await SUPABASE.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        setIsProcessingLink(false);
        notify("error", {
          title: "El enlace de confirmación no es válido o expiró",
        });
        return;
      }

      setToken(accessToken);
      window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
      notify("success", {
        title: "Correo verificado correctamente",
      });
      navigateTo(PATHS.home, true);
    };

    void initializeSignupSession();
  }, [navigateTo, notify, setToken]);

  const onSubmit = (data: IVerifyEmailForm) => {
    verifySignupOtpMutate(
      {
        email: data.email,
        token: data.verificationCode.trim(),
      },
      {
        onSuccess: (response) => {
          if (response.session?.access_token) {
            setToken(response.session.access_token);
          }
          notify("success", {
            title: "Correo verificado correctamente",
          });
          navigateTo(PATHS.home, true);
        },
        onError: (error) => {
          notify("error", {
            title: error instanceof Error ? error.message : "No se pudo verificar el código",
          });
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
    isVerifyPending,
    toggleMode,
    mode,
    handleNavigate,
    isProcessingLink,
  };
};
