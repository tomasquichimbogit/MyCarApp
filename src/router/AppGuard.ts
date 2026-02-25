import { createElement, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface AppGuardProps {
  children: ReactElement;
}

export const AppGuard = ({ children }: AppGuardProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return createElement(Navigate, { to: "/login", replace: true });
  }

  return children;
};
