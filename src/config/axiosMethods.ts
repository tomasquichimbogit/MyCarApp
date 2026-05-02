import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useNotify } from "tomascomponents";

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
    mutationFn: (variables, _context) => mutationFn(variables),
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
