import { Button } from "tomascomponents";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";

interface ICentralContainerUIProps {
  children: ReactNode;
  title?: string;
  onAddClick?: () => void;
  addButtonTitle?: ReactNode;
}

export const CentralContainerUI = ({ children, title, onAddClick, addButtonTitle }: ICentralContainerUIProps) => {
  const showAddButton = addButtonTitle && onAddClick;
  return (
    <div className="w-full min-h-full h-full p-4">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch gap-4">
        <div className="flex items-center justify-between">
          <div>{title && <h1 className="text-xl font-bold text-orange-rally">{title}</h1>}</div>
          {showAddButton && (
            <div>
              <Button title={<div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />  
                {addButtonTitle}
              </div>} onClick={onAddClick} />
            </div>
          )}
        </div>
        <div className="max-h-[calc(85vh-2rem)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
