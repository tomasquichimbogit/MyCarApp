import type { MenuProps } from "tomascomponents";
import { useSendFireBaseNotification } from "../../../../hooks/sendFireBaseNotification";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useSidebarStore } from "../../../../store/useSidebarStore";
import { PowerOff } from "lucide-react";
import { useSupabaseUserId } from "../../../../hooks/useSupabaseUser";
import { usePersonByUserIdQuery } from "../../../../services/person.service";
import { useMemo } from "react";

export interface IHeaderUI {
    toggleOpen: () => void;
    testNotification: () => Promise<void>;
    handleLogout: () => void;
    userOptions: MenuProps["items"];
    userName: string;
}

export const useHeaderUI = (): IHeaderUI => {
    const { toggleOpen } = useSidebarStore();
    const { logout } = useAuthStore();
   

    const { userId } = useSupabaseUserId();

    const { data: person } = usePersonByUserIdQuery(userId);

    const { sendFireBaseNotification } = useSendFireBaseNotification();


    const testNotification = async () => {
        const result = await sendFireBaseNotification("Test Notification", "This is a test notification");
        console.log(result);
    }

    const handleLogout = () => {
        logout();
    }

    const userOptions: MenuProps["items"] = [
      {
        label: (
          <div>
            User information 
          </div>
        ),
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


    const userName = useMemo(() => {
        if (!person) return '';
        return `${person?.name} ${person?.lastnames}`;
    }, [person]);

    return { toggleOpen, testNotification, handleLogout, userOptions, userName };
}