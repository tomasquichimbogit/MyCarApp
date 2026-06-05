import { SidebarView } from "./SidebarUI.view"
import { useSidebarUI } from "./SidebarUI.hook";
export const SidebarUI = () => {
    const hook = useSidebarUI();
    return (
        <SidebarView { ...hook } />
    )
}