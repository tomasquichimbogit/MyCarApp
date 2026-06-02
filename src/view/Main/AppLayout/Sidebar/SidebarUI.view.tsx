import type { ISidebarUI } from "./SidebarUI.hook";
import { Drawer } from "tomascomponents";

export const SidebarView = ({ open, toggleOpen }: ISidebarUI) => {
  return (
    <Drawer
      title="Sidebar"
      open={open}
      onClose={toggleOpen}
      closable={true}
      footer={<div>Footer</div>}
      children={<div>Children</div>}
    />
  );
};
