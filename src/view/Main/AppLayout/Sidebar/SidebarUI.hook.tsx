import { useSidebarStore } from "../../../../store/useSidebarStore";

export interface ISidebarUI {
    open: boolean;
    toggleOpen: () => void;
}   

export const useSidebarUI = (): ISidebarUI => {

    const { open, toggleOpen } = useSidebarStore();
    return { open, toggleOpen };
}