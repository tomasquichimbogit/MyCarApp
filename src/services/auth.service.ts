import { API_KEY_SUPABASE, SUPABASE, SUPABASE_URL } from "../constants";
import type { ILoginForm } from "../view/Security/Login/interface";
import { useMutation } from "@tanstack/react-query";
import { useApiPostMutation } from "../config/axiosMethods";

type SignInData = Awaited<ReturnType<typeof SUPABASE.auth.signInWithPassword>>["data"];
type RefreshSessionData = Awaited<ReturnType<typeof SUPABASE.auth.refreshSession>>["data"];

export const refreshSupabaseSession = async (): Promise<RefreshSessionData> => {
  const { data, error } = await SUPABASE.auth.refreshSession();
  if (error) throw error;
  return data;
};

export const signOutSupabase = async (): Promise<void> => {
  const { error } = await SUPABASE.auth.signOut();
  if (error) throw error;
};

export const useSignIn = () => {
  return useApiPostMutation<ILoginForm, SignInData>(
    true,
    async (dataSignIn) => {
      const { data, error } = await SUPABASE.auth.signInWithPassword(dataSignIn);
      if (error) throw error;
      return data;
    },
    "sign-in",
  );
};

export const useRefreshSession = (showErrorNotification = false) => {
  return useApiPostMutation<void, RefreshSessionData>(
    showErrorNotification,
    refreshSupabaseSession,
    "refresh-session",
  );
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (dataSignUp: ILoginForm) => {
      if (!SUPABASE_URL || !API_KEY_SUPABASE) {
        throw new Error("Supabase URL or API key is not set");
      }
      const { data, error } = await SUPABASE.auth.signUp({
        email: dataSignUp.email,
        password: dataSignUp.password,
      });
      return { data, error };
    },
  });
};