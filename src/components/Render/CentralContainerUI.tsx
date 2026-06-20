import { Button } from "tomascomponents";
import type { ReactNode } from "react";
import { ArrowLeftIcon, HomeIcon, Plus } from "lucide-react";
import { PATHS } from "@/router/paths";
import { useNavigate } from "react-router-dom";
import { Button as AntdButton } from "antd";

interface ICentralContainerUIProps {
  children: ReactNode;
  title?: string;
  onAddClick?: () => void;
  addButtonTitle?: ReactNode;
  subtitle?: string;
  returnTo?: "home" | "list";
}

export const CentralContainerUI = ({ children, title, onAddClick, addButtonTitle, subtitle, returnTo="home" }: ICentralContainerUIProps) => {
  const showAddButton = addButtonTitle && onAddClick;
  const navigate = useNavigate();
  const handleNavigateToHome = () => {
    if (returnTo === "list") {
      navigate(-1);
    } else {
      navigate(PATHS.home);
    }
  };

  return (
    <div className="w-full min-h-full h-full p-0.5 pt-2">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch gap-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-row gap-2">
            <div className="flex shrink-0 items-center justify-center pt-1">
              <AntdButton
                variant="link"
                type="text"
                size="small"
                icon={ returnTo === "home" ? <HomeIcon className="w-5 h-5" color="#d8ff28" /> : <ArrowLeftIcon className="w-5 h-5" color="#d8ff28" />}
                onClick={handleNavigateToHome}
              />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              {title && <h1 className="m-0 text-xl font-bold leading-tight text-orange-rally">{title}</h1>}
              {subtitle && <small className="block text-gray-500 text-md">{subtitle}</small>}
            </div>
          </div>
          {showAddButton && (
            <div className="flex shrink-0 items-center justify-end">
              <Button
                size="small"
                title={
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {addButtonTitle}
                  </div>
                }
                onClick={onAddClick}
              />
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
