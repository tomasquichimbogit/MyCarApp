import { createElement, type ReactElement, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { refreshSupabaseSession, syncSupabaseSession } from "../services/auth.service";
import { PATHS } from "./paths";
import { LOCAL_STORAGE_KEYS } from "@/constants";

interface AppGuardProps {
  children: ReactElement;
}

export const AppGuard = ({ children }: AppGuardProps) => {
  const token = useAuthStore((state) => state.getToken());
  const { setUser, logout } = useAuthStore();
  const [isValidated, setIsValidated] = useState(false);
  const hasValidatedSession = useRef(false);

  useEffect(() => {
    if (token) {
      const session = useAuthStore.getState().user?.session;
      if (session) {
        syncSupabaseSession(session)
          .then(() => setIsValidated(true))
          .catch(() => {
            logout();
            setIsValidated(true);
          });
        return;
      }
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
          await syncSupabaseSession(data.session);
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
    return createElement("div", null, "Validando sesión...");
  }

  if (!token) {
    return createElement(Navigate, { to: PATHS.login, replace: true });
  }

  return children;
};
