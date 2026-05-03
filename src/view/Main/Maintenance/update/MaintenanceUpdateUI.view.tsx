import { Form } from "tomascomponents";
import type { IMaintenanceUpdateUI } from "./MaintenanceUpdateUI.hook";
import { CustomFooterModal } from "@/components/Render/CustomFooterModal";
import { MaintenanceFormUI } from "../form/MaintenanceFormUI.controller";

export const MaintenanceUpdateUIView = ({
  control,
  handleFormSubmit,
  closeModal,
  loading,
  vehicleOptions,
  workshopOptions,
}: IMaintenanceUpdateUI) => {
  return (
    <div className="flex h-full w-full max-w-full min-h-0 flex-col gap-2 overflow-x-hidden md:w-[42vw]">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1">
        <Form method="post">
          <MaintenanceFormUI control={control} vehicleOptions={vehicleOptions} workshopOptions={workshopOptions} />
        </Form>
      </div>
      <CustomFooterModal onConfirm={handleFormSubmit} onCancel={closeModal} loading={loading} />
    </div>
  );
};
