import { Form } from "tomascomponents";
import type { IWorkhopsUpdateUI } from "./Workhops.hook";
import { CustomFooterModal } from "@/components/Render/CustomFooterModal";
import { WorkhopsFormUI } from "../form/WorkhopsFormUI.controller";

export const WorkhopsUpdateUIView = ({
  control,
  handleFormSubmit,
  closeModal,
  loading,
}: IWorkhopsUpdateUI) => {
  return (
    <div className="flex h-full w-full max-w-full min-h-0 flex-col gap-2 overflow-x-hidden md:w-[40vw]">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1">
        <Form method="post">
          <WorkhopsFormUI control={control} />
        </Form>
      </div>
      <CustomFooterModal onConfirm={handleFormSubmit} onCancel={closeModal} loading={loading} />
    </div>
  );
};
