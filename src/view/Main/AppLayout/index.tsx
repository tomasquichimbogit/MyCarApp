import { Outlet } from "react-router-dom";
import { HeaderUI } from "./Header/HeaderUI.controller";
import { SidebarUI } from "./Sidebar/SidebarUI.controller";
import { Main } from "./Main";

export const AppLayout = () => {
  return (
    <div className="flex-1">
      <HeaderUI />
      <SidebarUI />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};