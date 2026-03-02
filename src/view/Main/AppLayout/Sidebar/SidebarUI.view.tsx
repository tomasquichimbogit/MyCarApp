import type { ISidebarUI } from "./SidebarUI.hook";
import { Drawer } from "tomascomponents";

export const SidebarUIView = ({ open, toggleOpen }: ISidebarUI) => {
  return (
    <div>
      <Drawer
        title="Sidebar"
        open={open}
        onClose={toggleOpen}
        closable={true}
        footer={<div>Footer</div>}
        children={<div>Children</div>}
      />
    </div>
  );
};
