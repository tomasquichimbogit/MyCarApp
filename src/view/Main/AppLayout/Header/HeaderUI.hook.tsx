import type { MenuProps } from "tomascomponents";
import { useSendFireBaseNotification } from "../../../../hooks/sendFireBaseNotification";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useSidebarStore } from "../../../../store/useSidebarStore";
import { PowerOff } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useThemeMode } from "../../../../provider/Provider";
import { useUserPersonInformationStore } from "../../../../store/useUserPersonInformation";
import { useSupabaseUserId } from "../../../../hooks/useSupabaseUser";
import { usePersonByUserIdQuery } from "../../../../services/person.service";
import { signOutSupabase } from "../../../../services/auth.service";

export interface IHeaderUI {
    toggleOpen: () => void;
    testNotification: () => Promise<void>;
    handleLogout: () => void;
    userOptions: MenuProps["items"];
    userName: string;
    mode: "light" | "dark";
    toggleMode: () => void;
    isLoadingPerson: boolean;
}

export const useHeaderUI = (): IHeaderUI => {
    const { toggleOpen } = useSidebarStore();
    const { logout } = useAuthStore();
    
  const { userPersonInformation, setUserPersonInformation } = useUserPersonInformationStore();
  const { userId } = useSupabaseUserId();
  const { data: person, isLoading: isLoadingPerson } = usePersonByUserIdQuery(userId);


  useEffect(() => {
    if (person) {
      setUserPersonInformation(person);
    }
  }, [person, setUserPersonInformation]);

    const { sendFireBaseNotification } = useSendFireBaseNotification();
    const { mode, toggleMode } = useThemeMode();


    const testNotification = async () => {
        const result = await sendFireBaseNotification("Test Notification", "This is a test notification");
        console.log(result);
    }

    const handleLogout = async () => {
        try {
            await signOutSupabase();
            logout();
        } catch {
            logout();
        }
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
        if (!userPersonInformation) return 'Usuario';
        return `${userPersonInformation?.name} ${userPersonInformation?.lastnames}`;
    }, [userPersonInformation]);

    return { toggleOpen, testNotification, handleLogout, userOptions, userName, mode, toggleMode, isLoadingPerson };
}