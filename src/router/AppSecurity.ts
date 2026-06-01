import { createElement, type ReactElement, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { refreshSupabaseSession } from "../services/auth.service";
import { PATHS } from "./paths";

interface AppGuardSecurityProps {
  children: ReactElement;
}

/** Guest-only routes: redirect to app when session/token is valid. */
export const AppGuardSecurity = ({ children }: AppGuardSecurityProps) => {
  const token = useAuthStore((state) => state.token);
  const { getToken, setUser, logout } = useAuthStore();
  const [isValidated, setIsValidated] = useState(false);
  const hasValidatedSession = useRef(false);

  useEffect(() => {
    if (!getToken()) {
      setIsValidated(true);
      return;
    }

    if (hasValidatedSession.current) {
      setIsValidated(true);
      return;
    }

    hasValidatedSession.current = true;

    const validateSession = async () => {
      try {
        const data = await refreshSupabaseSession();
        const accessToken = data.access_token;

        if (accessToken) {
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
  }, [token, getToken, setUser, logout]);

  if (!isValidated) {
    return createElement("div", null, "Validando sesión...");
  }

  if (getToken()) {
    return createElement(Navigate, { to: PATHS.home, replace: true });
  }

  return children;
};
