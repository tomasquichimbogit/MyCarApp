import { Button, ButtonIcon } from "tomascomponents";
import type { IHeaderUI } from "./HeaderUI.hook";
import { MenuIcon } from "lucide-react";
import { useAuthStore } from "../../../../store/useAuthStore";

export const HeaderUIView = ({ toggleOpen, testNotification }: IHeaderUI) => {
  const { logout } = useAuthStore();
  return (
    <header className="flex flex-row items-center justify-between h-[64px] sticky top-0 z-1000 w-full border-b border-gray-200">
      <ButtonIcon onClick={toggleOpen} icon={<MenuIcon />} variant="text" ariaLabel="Text" />
      <div className="flex flex-row items-center gap-2">
        <Button variant="outlined" onClick={logout} title="Logout" />
        <Button onClick={testNotification} title="Test Notification" />
      </div>
    </header>
  );
};
