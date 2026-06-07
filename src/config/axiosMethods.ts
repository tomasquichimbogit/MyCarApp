import { cleanObjectData } from "@/helper";
import {
  useMutation,
  useQuery,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useNotify } from "tomascomponents";

const DEFAULT_STALE_TIME = 1000 * 60 * 5;
const DEFAULT_GC_TIME = 1000 * 60 * 30;

export function useApiGetQuery<
  TResponse = unknown,
  TError = Error,
>(
  queryKey: QueryKey,
  queryFn: () => Promise<TResponse>,
  options?: Omit<
    UseQueryOptions<TResponse, TError, TResponse, QueryKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TResponse, TError> {
  return useQuery<TResponse, TError, TResponse, QueryKey>({
    queryKey,
    queryFn,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    ...options,
  });
}

export function useApiPostMutation<
  TRequest = unknown,
  TResponse = unknown,
  TError = Error,
>(
  showErrorNotification: boolean,
  mutationFn: (payload: TRequest) => Promise<TResponse>,
  key?: string,
  options?: UseMutationOptions<TResponse, TError, TRequest>
): UseMutationResult<TResponse, TError, TRequest> {
  const { notify } = useNotify();
  return useMutation<TResponse, TError, TRequest>({
    mutationKey: key !== undefined ? ["POST", key] : ["POST"],
    mutationFn: (variables) => {
      const cleanVariables = cleanObjectData(variables);
      return mutationFn(cleanVariables);
    },
    ...options,
    onError: (error, variables, onMutateResult, context) => {
      if (showErrorNotification) {
        const message =
          error instanceof Error ? error.message : String(error);
        notify("error", {
          title: message,
        });
      }
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
}
