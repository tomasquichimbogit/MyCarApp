import { createElement, type ReactElement, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { refreshSupabaseSession } from "../services/auth.service";
import { PATHS } from "./paths";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { LoadingApp } from "@/components/Render/LoadingApp";

interface AppGuardSecurityProps {
  children: ReactElement;
}

/** Guest-only routes: redirect to app when session/token is valid. */
export const AppGuardSecurity = ({ children }: AppGuardSecurityProps) => {
  const token = useAuthStore((state) => state.getToken());
  const { setUser, logout } = useAuthStore();
  const [isValidated, setIsValidated] = useState(false);
  const hasValidatedSession = useRef(false);

  useEffect(() => {
    if (token) {
      setIsValidated(true);
      return;
    }

    if (hasValidatedSession.current) {
      return;
    }

    hasValidatedSession.current = true;

    const validateSession = async () => {
      try {
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) {
          logout();
          return;
        }
        const data = await refreshSupabaseSession(refreshToken);
        const accessToken = data.session.access_token;

        if (accessToken) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, data.session.refresh_token);
          setUser(data);
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setIsValidated(true);
      }
    };

    validateSession();
  }, [token, setUser, logout]);

  if (!isValidated) {
    return createElement(LoadingApp, { fullScreen: true });
  }

  if (token) {
    return createElement(Navigate, { to: PATHS.home, replace: true });
  }

  return children;
};
