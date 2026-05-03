import { useForm } from "react-hook-form";
import { vehicleFormSchema } from "./vehicleForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { VehicleRecord } from "@/services/vehiculo.service";
import { useUserPersonInformationStore } from "../../../../../../../../store/useUserPersonInformation";
import { useEffect } from "react";

export const useVehicleCreateForm = () => {
  const methods = useForm<VehicleRecord>({
    mode: "all",
    resolver: zodResolver(vehicleFormSchema),
  });

  const { userPersonInformation } = useUserPersonInformationStore();

  useEffect(() => {
    if (userPersonInformation) {
      methods.setValue("propietario_id", userPersonInformation.id);
    }
  }, [methods, userPersonInformation]);

  return { methods };
};
