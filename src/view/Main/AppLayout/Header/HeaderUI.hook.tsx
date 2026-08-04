import { signOutSupabase } from "@/services/auth.service";
import type { MenuProps } from "antd";
import { useAuthStore } from "@/store/useAuthStore";
import { PowerOff } from "lucide-react";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";
import { useCurrentPerson } from "@/services/person/person.services";
import { useEffect } from "react";

export interface IHeaderUIHook {
  userOptions: MenuProps["items"];
  userName?: string;
  toggleOpen: () => void;
}


export const HeaderUIHook = (): IHeaderUIHook => {
  const navigate = useNavigate();
  const { logout, user, setPersonId } = useAuthStore();
  const { toggleOpen } = useSidebarStore();
  const { data: person } = useCurrentPerson();

  console.log('person =>',person);

  const userName = person?.names
    ? `${person.names} ${person.last_names ?? ""}`.trim()
    : user?.user.email;

  useEffect(() => {
    if (person) {
      setPersonId(person.id);
    }
  }, [person, setPersonId]);

  const handleNavigateToUserInformation = () => {
    navigate(PATHS.userInformation);
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
      label: <div>Mi información</div>,
      onClick: handleNavigateToUserInformation,
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