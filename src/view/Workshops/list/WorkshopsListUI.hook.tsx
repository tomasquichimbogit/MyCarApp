import { useWorkshops } from "@/services/workshops/workshops.services";
import type { IWorkshop } from "./interfaces";

export interface IUseWorkshopsListUIHook {
  workshops: IWorkshop[];
  isLoading: boolean;
  isError: boolean;
}

export const useWorkshopsListUIHook = (): IUseWorkshopsListUIHook => {
  const { data: workshops = [], isLoading, isError } = useWorkshops();

  return {
    workshops,
    isLoading,
    isError,
  };
};