import { ButtonIcon } from "tomascomponents";
import type { IHeaderUI } from "./HeaderUI.hook";
import { MenuIcon } from "lucide-react";

export const HeaderUIView = ({ toggleOpen }: IHeaderUI) => {
  return (
    <header className="flex flex-row items-center justify-between h-[64px] sticky top-0 z-1000 w-full border-b border-gray-200">
      <ButtonIcon onClick={toggleOpen} icon={<MenuIcon />} variant="text" ariaLabel="Text" />
      <h1>My Car App</h1>
    </header>
  );
};
