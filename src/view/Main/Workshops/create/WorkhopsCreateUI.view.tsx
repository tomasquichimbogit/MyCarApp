import { Form } from "tomascomponents";
import type { IWorkhopsCreateUI } from "./WorkhopsCreateUI.hook";
import { CustomFooterModal } from "@/components/Render/CustomFooterModal";
import { WorkhopsFormUI } from "../form/WorkhopsFormUI.controller";

export const WorkhopsCreateUIView = ({
  control,
  handleFormSubmit,
  closeModal,
  loading,
}: IWorkhopsCreateUI) => {
  return (
    <div className="flex h-full w-full max-w-full min-h-0 flex-col gap-2 overflow-x-hidden md:w-[40vw]">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1">
        <Form method="post">
          <WorkhopsFormUI control={control} />
        </Form>
      </div>
      <CustomFooterModal onCancel={closeModal} onConfirm={handleFormSubmit} loading={loading} />
    </div>
  );
};
