import { createElement, type ReactElement, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { refreshSupabaseSession } from "../services/auth.service";

interface AppGuardProps {
  children: ReactElement;
}

export const AppGuard = ({ children }: AppGuardProps) => {
  const { getToken, removeToken, setToken } = useAuthStore();
  const [isValidated, setIsValidated] = useState(false);
  const hasValidatedSession = useRef(false);

  useEffect(() => {
    if (hasValidatedSession.current && getToken() !== null) {
      setIsValidated(true);
      return;
    };
    hasValidatedSession.current = true;

    const validateSession = async () => {
      try {
        const data = await refreshSupabaseSession();
        const accessToken = data.session?.access_token;

        if (accessToken) {
          setToken(accessToken);
        } else {
          removeToken();
        }
      } catch {
        removeToken();
      } finally {
        setIsValidated(true);
      }
    };

    validateSession();
  }, [getToken, removeToken, setToken]);

  if (!isValidated) {
    return createElement("div", null, "Validando sesión...");
  }

  if (!getToken()) {
    return createElement(Navigate, { to: "/login", replace: true });
  }

  return children;
};
