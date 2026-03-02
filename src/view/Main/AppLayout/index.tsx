import { Outlet } from "react-router-dom";
import { HeaderUI } from "./Header/HeaderUI.controller";
import { SidebarUI } from "./Sidebar/SidebarUI.controller";
import { Main } from "./Main";

export const AppLayout = () => {
  return (
    <div className="flex-1 min-h-0 h-[calc(100vh-64px)] w-full ">
      <HeaderUI />
      <SidebarUI />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};