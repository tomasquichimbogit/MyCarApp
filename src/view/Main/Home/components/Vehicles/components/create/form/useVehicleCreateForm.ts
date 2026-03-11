import { useForm } from "react-hook-form";
import { vehicleFormSchema } from "./vehicleForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { VehicleInsert } from "../../../../../../../../services/vehiculo.service";

export const useVehicleCreateForm = () => {
  const methods = useForm<VehicleInsert>({
    resolver: zodResolver(vehicleFormSchema),
  });

  return { methods };
};
