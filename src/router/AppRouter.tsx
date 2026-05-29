import { useForegroundMessages } from "../hooks/useForegroundMessages.hook";
import { LoginUI } from "../view/Security/Login/LoginUI.controller";

import { Routes, Route, Navigate } from "react-router-dom";
import { AppGuard } from "./AppGuard";
import { RecoveryPasswordUI } from "../view/Security/RecoveryPassword/RecoveryPasswordUI.controller";
import { AppLayout } from "../view/Main/AppLayout";
import { HomeUI } from "../view/Main/Home/HomeUI.controller";
import { Error404 } from "../view/Main/Error404";
import { RegisterUserUI } from "@/view/Security/Register/RegisterUserUI.controller";
import { VerifyEmailUI } from "@/view/Security/VerifyEmail/VerifyEmailUI.controller";
import { PATHS } from "./paths";
import { isSignupAuthCallback } from "@/helper/authRedirect";

export const AppRouter = () => {
  useForegroundMessages();

  if (isSignupAuthCallback()) {
    return <VerifyEmailUI />;
  }

  return (
    <Routes>
      <Route path={PATHS.login} element={<LoginUI />} />
      <Route path={PATHS.recoveryPassword} element={<RecoveryPasswordUI />} />
      <Route path={PATHS.registerUser} element={<RegisterUserUI />} />
      <Route path={PATHS.verifyEmail} element={<VerifyEmailUI />} />
      <Route
        path={PATHS.home}
        element={
          <AppGuard>
            <AppLayout />
          </AppGuard>
        }
      >
        <Route index element={<HomeUI />} />
        <Route path="home" element={<HomeUI />} />
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.login} replace />} />
    </Routes>
  );
};

export default AppRouter;
