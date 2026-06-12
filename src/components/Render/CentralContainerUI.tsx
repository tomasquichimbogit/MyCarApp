import { Button } from "tomascomponents";
import type { ReactNode } from "react";
import { HomeIcon, Plus } from "lucide-react";
import { PATHS } from "@/router/paths";
import { useNavigate } from "react-router-dom";
import { Button as AntdButton } from "antd";
import { useMemo } from "react";
interface ICentralContainerUIProps {
  children: ReactNode;
  title?: string;
  onAddClick?: () => void;
  addButtonTitle?: ReactNode;
  subtitle?: string;
}

export const CentralContainerUI = ({ children, title, onAddClick, addButtonTitle, subtitle }: ICentralContainerUIProps) => {
  const showAddButton = addButtonTitle && onAddClick;
  const navigate = useNavigate();
  const handleNavigateToHome = () => {
    navigate(PATHS.home);
  };

  const classHeader = useMemo(() => {
    return showAddButton ? "3" : "2"; 
  }, [showAddButton]);

  return (
    <div className="w-full min-h-full h-full p-4">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch gap-0">
        <div className={`grid grid-cols-${classHeader} gap-2`}>
          <div className="col-span-2 flex flex-row gap-2">
            <div className="flex items-center justify-center pt-1">
              <AntdButton
                variant="link"
                type="text"
                size="small"
                icon={<HomeIcon className="w-5 h-5" color="#d8ff28" />}
                onClick={handleNavigateToHome}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div>{title && <h1 className="text-xl font-bold text-orange-rally">{title}</h1>}</div>
            </div>
          </div>

          <div className="col-span-1 flex items-center justify-end">
            {showAddButton && (
              <div className="flex items-center justify-end">
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
        </div>
        <div>{subtitle && <small className="text-xs md:text-sm text-gray-500">{subtitle}</small>}</div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};
