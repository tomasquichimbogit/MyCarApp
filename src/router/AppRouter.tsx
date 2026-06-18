import { useForegroundMessages } from "../hooks/useForegroundMessages.hook";
import { LoginUI } from "../view/Security/Login/LoginUI.controller";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppGuard } from "./AppGuard";
import { AppGuardSecurity } from "./AppSecurity";
import { AppLayout } from "../view/Main/AppLayout";
import { ErrorPage } from "../view/Main/Error";
import { PATHS } from "./paths";
import { HomeUI } from "@/view/Main/Home";
import { RecoveryPasswordUI } from "@/view/Security/RecoveryPassword/RecoveryPasswordUI.controller";
import { RegisterUI } from "@/view/Security/Register/RegisterUI.controller";
import { VerifyEmailUI } from "@/view/Security/VerifyEmail/VerifyEmailUI.controller";
import { SecurityLayout } from "@/view/Security";
import { VehiclesUI } from "@/view/Vehicles/list/VehiclesUI.controller";
import { MaintenanceUI } from "@/view/Maintenance/list/MaintenanceUI.controller";
import { AdventurePostsUI } from "@/view/AdventurePosts/AdventurePostsUI.controller";
import { UserInformationUI } from "@/view/UserInformation/UserInformationUI.controller";
import { WorkshopsListUI } from "@/view/Workshops/list/WorkshopsListUI.controller";
import { MaintenanceCreateUI } from "@/view/Maintenance/create/MaintenanceCreateUI.controller";
import { TestImagesUIView } from "@/view/Test/TestImagesUI.view";
import { UploadLogoWorkshopUI } from "@/view/Tools/UploadLogoWorkshop";

export const AppRouter = () => {
  useForegroundMessages();
  return (
    <Routes>
      <Route
        element={
          <AppGuardSecurity>
            <SecurityLayout />
          </AppGuardSecurity>
        }
      >
        <Route path={PATHS.login} element={<LoginUI />} />
        <Route path={PATHS.recoveryPassword} element={<RecoveryPasswordUI />} />
        <Route path={PATHS.registerUser} element={<RegisterUI />} />
        <Route path={PATHS.verifyEmail} element={<VerifyEmailUI />} />
      </Route>

      <Route
        path={PATHS.home}
        element={
          <AppGuard>
            <AppLayout />
          </AppGuard>
        }
      >
        <Route index element={<HomeUI />} />
        <Route path={PATHS.home} element={<HomeUI />} />
        <Route path={PATHS.vehicles} element={<VehiclesUI />} />
        <Route path={PATHS.maintenance} element={<MaintenanceUI />} />
        <Route path={PATHS.maintenanceCreate} element={<MaintenanceCreateUI />} />
        <Route path={PATHS.workshops} element={<WorkshopsListUI />} />
        <Route path={PATHS.uploadLogoWorkshop} element={<UploadLogoWorkshopUI />} />
        <Route path={PATHS.adventure} element={<AdventurePostsUI />} />
        <Route path={PATHS.userInformation} element={<UserInformationUI />} />
        <Route path={PATHS.testImages} element={<TestImagesUIView />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.login} replace />} />
    </Routes>
  );
};

export default AppRouter;
