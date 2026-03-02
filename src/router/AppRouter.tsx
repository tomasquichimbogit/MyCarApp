import { useForegroundMessages } from "../hooks/useForegroundMessages.hook";
import { LoginUI } from "../view/Security/Login/LoginUI.controller";

import { Routes, Route, Navigate } from "react-router-dom";
import { AppGuard } from "./AppGuard";
import { RecoveryPasswordUI } from "../view/Security/RecoveryPassword/RecoveryPasswordUI.controller";
import { AppLayout } from "../view/Main/AppLayout";
import { HomeUI } from "../view/Main/Home/HomeUI.controller";
import { Error404 } from "../view/Main/Error404";

export const AppRouter = () => {
  useForegroundMessages();

  return (
    <Routes>
      <Route path="/login" element={<LoginUI />} />
      <Route path="/recovery-password" element={<RecoveryPasswordUI />} />
      <Route
        path="/"
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
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
