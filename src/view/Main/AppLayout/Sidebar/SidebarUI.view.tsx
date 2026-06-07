import { getMenuItems } from "@/constants/menu";
import type { ISidebarUI } from "./SidebarUI.hook";
import { Drawer, Menu } from "tomascomponents";

export const SidebarView = ({ open, toggleOpen, handleNavigate, selectedKeys }: ISidebarUI) => {
  return (
    <Drawer
      title="Menú"
      open={open}
      onClose={toggleOpen}
      closable={true}
      footer={<div className="text-desert-sand">Footer</div>}
      children={
        <div>
          <Menu
            className="sidebar-menu"
            items={getMenuItems("w-4 h-4 text-desert-sand", handleNavigate)}
            selectedKeys={selectedKeys}
          />
        </div>
      }
    />
  );
};
