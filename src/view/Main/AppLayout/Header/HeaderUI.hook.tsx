import { useSidebarStore } from "../../../../store/useSidebarStore";

export interface IHeaderUI {
    toggleOpen: () => void;
}

export const useHeaderUI = (): IHeaderUI => {
    const { toggleOpen } = useSidebarStore();
    return { toggleOpen };
}