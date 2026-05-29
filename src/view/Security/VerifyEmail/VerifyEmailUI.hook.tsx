import { useEffect, useState } from "react";
import { useThemeMode } from "../../../provider/Provider";
import { SUPABASE } from "../../../constants";
import { cleanAuthHashUrl, parseAuthHashParams } from "../../../helper/authRedirect";
import { PATHS } from "@/router/paths";
import { useAuthStore } from "../../../store/useAuthStore";

export type VerifyEmailStatus = "loading" | "success" | "error";

export interface IVerifyEmailUI {
  status: VerifyEmailStatus;
  toggleMode: () => void;
  mode: "light" | "dark";
}

export const useVerifyEmailUI = (): IVerifyEmailUI => {
  const { mode, toggleMode } = useThemeMode();
  const { setToken } = useAuthStore();
  const [status, setStatus] = useState<VerifyEmailStatus>("loading");

  useEffect(() => {
    const confirmSignupFromEmailLink = async () => {
      const params = parseAuthHashParams();
      const type = params?.get("type");
      const accessToken = params?.get("access_token");
      const refreshToken = params?.get("refresh_token");

      if (type !== "signup" || !accessToken || !refreshToken) {
        setStatus("error");
        return;
      }

      const { error } = await SUPABASE.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        setStatus("error");
        return;
      }

      setToken(accessToken);
      cleanAuthHashUrl(PATHS.verifyEmail);
      setStatus("success");
    };

    void confirmSignupFromEmailLink();
  }, [setToken]);

  return {
    status,
    toggleMode,
    mode,
  };
};
