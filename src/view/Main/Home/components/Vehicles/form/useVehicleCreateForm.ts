import { useForm } from "react-hook-form";
import { vehicleFormSchema } from "./vehicleForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { VehicleRecord } from "@/services/vehiculo.service";
import { useUserPersonInformationStore } from "@/store/useUserPersonInformation";
import { useEffect, useMemo } from "react";
import { BRANDS } from "@/constants/Brands";
import { MODELS } from "@/constants/Models";
import { COLORS } from "@/constants/Colors";

export const useVehicleCreateForm = () => {
  const methods = useForm<VehicleRecord>({
    mode: "all",
    resolver: zodResolver(vehicleFormSchema),
  });
  const { watch } = methods;
  const brand = watch("marca");
  
  const { userPersonInformation } = useUserPersonInformationStore();

  useEffect(() => {
    if (userPersonInformation) {
      methods.setValue("propietario_id", userPersonInformation.id);
    }
  }, [methods, userPersonInformation]);

    const brandsOptions = useMemo(() => {
      return BRANDS.map((brand) => ({
        label: brand.name,
        value: brand.name,
      }));
    }, []);

    const modelsOptions = useMemo(() => {
      const selectedBrand = BRANDS.find((b) => b.name === brand);
      if (!selectedBrand) return [];
      const modelsByBrand = MODELS[selectedBrand.name] ?? MODELS.Otra ?? [];
      return modelsByBrand.map((model) => ({
        label: model.name,
        value: model.name,
      }));
    }, [brand]);

    const colorsOptions = useMemo(() => {
      return COLORS.map((color) => ({
        label: color.name,
        value: color.name,
      }));
    }, []);

  return { methods, brandsOptions, modelsOptions, colorsOptions };
};
