import { PATHS } from "@/router/paths";
import { useNavigate } from "react-router-dom";
import { useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaCreateMaintenanceUI, type ICreateMaintenanceUI } from "./interface";

export interface IUseMaintenanceCreateUIHook {
  handleCancel: () => void;
  control: Control<ICreateMaintenanceUI>;
}

export const useMaintenanceCreateUIHook = (): IUseMaintenanceCreateUIHook => {

    const navigate = useNavigate();

    const { control } = useForm<ICreateMaintenanceUI>({
        resolver: zodResolver(schemaCreateMaintenanceUI),
    });


    const handleCancel = () => {
        navigate(PATHS.maintenance);
    }
  return {
    handleCancel,
    control,
  };
};
