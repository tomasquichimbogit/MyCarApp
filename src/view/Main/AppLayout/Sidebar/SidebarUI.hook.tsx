import { useSidebarStore } from "@/store/useSidebarStore";
import { useLocation, useNavigate } from "react-router-dom";

export interface ISidebarUI {
  open: boolean;
  toggleOpen: () => void;
  handleNavigate: (path: string) => void;
  selectedKeys: string[];
}

export const useSidebarUI = (): ISidebarUI => {
  const { open, toggleOpen } = useSidebarStore();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return { open, toggleOpen, handleNavigate, selectedKeys: [pathname] };
};
