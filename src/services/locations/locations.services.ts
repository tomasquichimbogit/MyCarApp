import { useApiGetQuery } from "@/config/axiosMethods";
import provinciasData from "@/data/ecuador/provincias.json";
import type { DefaultOptionType } from "antd/es/select";
import { locationsKeys } from "./locationsKeys";
import type {
  IEcuadorProvincias,
  ILocationOption,
  ILocationPath,
} from "./locations.types";

const STATIC_STALE_TIME = Number.POSITIVE_INFINITY;
const UNKNOWN_PROVINCE_NAME = "ZONA NO DELIMITADA";

const ecuadorProvincias = provinciasData as IEcuadorProvincias;

const sortByName = (items: ILocationOption[]) =>
  [...items].sort((a, b) => a.name.localeCompare(b.name, "es"));

const toLocationOptions = (
  entries: [string, string][],
): ILocationOption[] =>
  entries.map(([id, name]) => ({ id, name }));

export const fetchProvincias = async (): Promise<ILocationOption[]> => {
  const provincias = Object.entries(ecuadorProvincias).map(([id, { provincia }]) => ({
    id,
    name: provincia ?? UNKNOWN_PROVINCE_NAME,
  }));

  return sortByName(provincias);
};

export const fetchCantones = async (
  provinciaId: string,
): Promise<ILocationOption[]> => {
  const cantones = ecuadorProvincias[provinciaId]?.cantones;

  if (!cantones) return [];

  return sortByName(
    toLocationOptions(
      Object.entries(cantones).map(([id, { canton }]) => [id, canton]),
    ),
  );
};

export const fetchParroquias = async (
  provinciaId: string,
  cantonId: string,
): Promise<ILocationOption[]> => {
  const parroquias =
    ecuadorProvincias[provinciaId]?.cantones[cantonId]?.parroquias;

  if (!parroquias) return [];

  return sortByName(toLocationOptions(Object.entries(parroquias)));
};

export const getProvinciaById = (
  provinciaId: string,
): ILocationOption | undefined => {
  const provincia = ecuadorProvincias[provinciaId];

  if (!provincia) return undefined;

  return {
    id: provinciaId,
    name: provincia.provincia ?? UNKNOWN_PROVINCE_NAME,
  };
};

export const getCantonById = (
  provinciaId: string,
  cantonId: string,
): ILocationOption | undefined => {
  const canton = ecuadorProvincias[provinciaId]?.cantones[cantonId];

  if (!canton) return undefined;

  return {
    id: cantonId,
    name: canton.canton,
  };
};

export const getParroquiaById = (
  provinciaId: string,
  cantonId: string,
  parroquiaId: string,
): ILocationOption | undefined => {
  const parroquiaName =
    ecuadorProvincias[provinciaId]?.cantones[cantonId]?.parroquias?.[
      parroquiaId
    ];

  if (!parroquiaName) return undefined;

  return {
    id: parroquiaId,
    name: parroquiaName,
  };
};

export const resolveLocationPath = (
  provinciaId: string,
  cantonId: string,
  parroquiaId: string,
): ILocationPath | null => {
  const provincia = getProvinciaById(provinciaId);
  const canton = getCantonById(provinciaId, cantonId);
  const parroquia = getParroquiaById(provinciaId, cantonId, parroquiaId);

  if (!provincia || !canton || !parroquia) return null;

  return {
    provinciaId,
    provinciaName: provincia.name,
    cantonId,
    cantonName: canton.name,
    parroquiaId,
    parroquiaName: parroquia.name,
  };
};

export const formatLocationPath = (location: ILocationPath): string =>
  [location.parroquiaName, location.cantonName, location.provinciaName]
    .filter(Boolean)
    .join(", ");

export const toSelectOptions = (
  options: ILocationOption[],
): DefaultOptionType[] =>
  options.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

export const useProvincias = () =>
  useApiGetQuery(locationsKeys.provincias(), fetchProvincias, {
    staleTime: STATIC_STALE_TIME,
  });

export const useCantones = (provinciaId?: string) =>
  useApiGetQuery(
    locationsKeys.cantones(provinciaId ?? ""),
    () => fetchCantones(provinciaId!),
    {
      enabled: !!provinciaId,
      staleTime: STATIC_STALE_TIME,
    },
  );

export const useParroquias = (provinciaId?: string, cantonId?: string) =>
  useApiGetQuery(
    locationsKeys.parroquias(provinciaId ?? "", cantonId ?? ""),
    () => fetchParroquias(provinciaId!, cantonId!),
    {
      enabled: !!provinciaId && !!cantonId,
      staleTime: STATIC_STALE_TIME,
    },
  );

export interface IEcuadorLocationOptions {
  provinciasOptions: DefaultOptionType[];
  cantonesOptions: DefaultOptionType[];
  parroquiasOptions: DefaultOptionType[];
  isLoadingProvincias: boolean;
  isLoadingCantones: boolean;
  isLoadingParroquias: boolean;
}

export const useEcuadorLocationOptions = (
  provinciaId?: string,
  cantonId?: string,
): IEcuadorLocationOptions => {
  const { data: provincias = [], isLoading: isLoadingProvincias } =
    useProvincias();
  const { data: cantones = [], isLoading: isLoadingCantones } =
    useCantones(provinciaId);
  const { data: parroquias = [], isLoading: isLoadingParroquias } =
    useParroquias(provinciaId, cantonId);

  return {
    provinciasOptions: toSelectOptions(provincias),
    cantonesOptions: toSelectOptions(cantones),
    parroquiasOptions: toSelectOptions(parroquias),
    isLoadingProvincias,
    isLoadingCantones,
    isLoadingParroquias,
  };
};
