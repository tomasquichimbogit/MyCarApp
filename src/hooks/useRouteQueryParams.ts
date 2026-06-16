import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const parseNumberParam = (value: string | null): number | undefined => {
  if (!value) return undefined;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const parseBooleanParam = (value: string | null): boolean | undefined => {
  if (value === null) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

export interface IUseRouteQueryParams {
  getParam: (key: string) => string | undefined;
  getNumberParam: (key: string) => number | undefined;
  getBooleanParam: (key: string) => boolean | undefined;
}

export const useRouteQueryParams = (): IUseRouteQueryParams => {
  const [searchParams] = useSearchParams();

  return useMemo(
    () => ({
      getParam: (key: string) => searchParams.get(key) ?? undefined,
      getNumberParam: (key: string) => parseNumberParam(searchParams.get(key)),
      getBooleanParam: (key: string) => parseBooleanParam(searchParams.get(key)),
    }),
    [searchParams],
  );
};
