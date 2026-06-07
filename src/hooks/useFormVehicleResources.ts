import { COLORS } from "@/constants/Colors";
import { useBrands } from "@/services/brands/brands.services";
import { useModels } from "@/services/models/models.services";

export const useFormVehicleResources = (brandId: number) => {

    const { data: brands = [], isLoading: isLoadingBrands, isError: isErrorBrands } = useBrands();
    const { data: models = [], isLoading: isLoadingModels, isError: isErrorModels } = useModels(brandId,{enabled: brandId > 0});
    
    const loadingResources = isLoadingBrands || isLoadingModels;
    const errorResources = isErrorBrands || isErrorModels;

    const brandsOptions = brands.map((brand) => ({
        label: brand.name,
        value: brand.id,
    }));
    const modelsOptions = models.map((model) => ({
        label: model.name,
        value: model.id,
    }));

    const colorsOptions = COLORS.map((color) => ({
        label: color.name,
        value: color.name,
    }));
    return {
        loadingResources,
        errorResources,
        brandsOptions,
        modelsOptions,
        colorsOptions,
    }
}