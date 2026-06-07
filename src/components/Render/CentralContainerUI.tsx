import { Button } from "tomascomponents";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";

interface ICentralContainerUIProps {
  children: ReactNode;
  title?: string;
  onAddClick?: () => void;
  addButtonTitle?: ReactNode;
  subtitle?: string;
}

export const CentralContainerUI = ({ children, title, onAddClick, addButtonTitle, subtitle }: ICentralContainerUIProps) => {
  const showAddButton = addButtonTitle && onAddClick;
  return (
    <div className="w-full min-h-full h-full p-4">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch gap-0.5">
        <div className="flex items-center justify-between gap-0.5">
          <div className="flex flex-col gap-0.5">
            <div>{title && <h1 className="text-xl font-bold text-orange-rally">{title}</h1>}</div>
            <div>{subtitle && <small className="text-xs md:text-sm text-gray-500">{subtitle}</small>}</div>
          </div>
          {showAddButton && (
            <div>
              <Button
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
        <div className="max-h-[calc(84vh-2rem)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
