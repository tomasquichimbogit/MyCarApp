import { useWorkshops } from "@/services/workshops/workshops.services";
import { useMemo, useState } from "react";
import type { IWorkshop } from "./interfaces";
import { getWorkshopAddress } from "./components/workshop.utils";

export const WORKSHOP_SERVICE_FILTERS = [
  "Todos",
  "Motos",
  "Carros",
  "Cambio de aceite",
  "Llantas",
] as const;

export type TWorkshopServiceFilter = (typeof WORKSHOP_SERVICE_FILTERS)[number];

export interface IUseWorkshopsListUIHook {
  workshops: IWorkshop[];
  isLoading: boolean;
  isError: boolean;
  search: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFilter: TWorkshopServiceFilter;
  setSelectedFilter: (filter: TWorkshopServiceFilter) => void;
  serviceFilters: TWorkshopServiceFilter[];
}

const matchesServiceFilter = (workshop: IWorkshop, filter: TWorkshopServiceFilter) => {
  if (filter === "Todos") return true;

  const normalizedFilter = filter.toLowerCase();
  return workshop.services.some((service) => service.toLowerCase().includes(normalizedFilter));
};

const matchesSearch = (workshop: IWorkshop, search: string) => {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return true;

  const searchableValues = [
    workshop.name,
    workshop.address,
    workshop.city,
    workshop.state,
    workshop.country,
    getWorkshopAddress(workshop),
    ...workshop.services,
  ];

  return searchableValues.some((value) => value?.toLowerCase().includes(normalizedSearch));
};

export const useWorkshopsListUIHook = (): IUseWorkshopsListUIHook => {
  const { data: workshops = [], isLoading, isError } = useWorkshops();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<TWorkshopServiceFilter>("Todos");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredWorkshops = useMemo(
    () => workshops.filter((workshop) => matchesSearch(workshop, search) && matchesServiceFilter(workshop, selectedFilter)),
    [workshops, search, selectedFilter],
  );

  return {
    workshops: filteredWorkshops,
    isLoading,
    isError,
    search,
    handleSearchChange,
    selectedFilter,
    setSelectedFilter,
    serviceFilters: [...WORKSHOP_SERVICE_FILTERS],
  };
};
