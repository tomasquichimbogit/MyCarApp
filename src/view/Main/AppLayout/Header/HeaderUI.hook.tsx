import { signOutSupabase } from "@/services/auth.service";
import type { MenuProps } from "antd";
import { useAuthStore } from "@/store/useAuthStore";
import { PowerOff } from "lucide-react";
import { useSidebarStore } from "@/store/useSidebarStore";

export interface IHeaderUIHook {
    userOptions: MenuProps["items"];
    userName?: string;
    toggleOpen: () => void;
}


export const HeaderUIHook = (): IHeaderUIHook => {
      const { logout, user } = useAuthStore();
      const { toggleOpen } = useSidebarStore();
      const userName = user?.user.email;

      const testNotification = async () => {
        console.log("Test Notification");
      };

      const handleLogout = async () => {
        try {
          await signOutSupabase();
          logout();
        } catch {
          logout();
        }
      };

   const userOptions: MenuProps["items"] = [
     {
       label: <div>User information</div>,
       onClick: testNotification,
       key: "1",
     },
     {
       label: (
         <div className="flex flex-row justify-between items-center gap-2">
           Logout <PowerOff className="w-4 h-4" />
         </div>
       ),
       onClick: handleLogout,
       key: "0",
       style: {
         color: "red",
       },
     },
   ];

    return {
        userOptions,
        userName,
        toggleOpen,
    }
}