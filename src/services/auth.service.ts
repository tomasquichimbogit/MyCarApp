import { API_KEY_SUPABASE, SUPABASE, SUPABASE_URL } from "../constants";
import type { ILoginForm } from "../view/Security/Login/interface";
import type { IRegisterUserForm } from "../view/Security/Register/interface";
import { useApiPostMutation } from "../config/axiosMethods";
import { PATHS } from "@/router/paths";
import { getAuthRedirectUrl } from "@/helper/authRedirect";

type SignInData = Awaited<ReturnType<typeof SUPABASE.auth.signInWithPassword>>["data"];
type RefreshSessionData = Awaited<ReturnType<typeof SUPABASE.auth.refreshSession>>["data"];
type SignUpData = Awaited<ReturnType<typeof SUPABASE.auth.signUp>>["data"];

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
  return useApiPostMutation<IRegisterUserForm, SignUpData>(
    true,
    async (dataSignUp) => {
      if (!SUPABASE_URL || !API_KEY_SUPABASE) {
        throw new Error("Supabase URL or API key is not set");
      }
      const { data, error } = await SUPABASE.auth.signUp({
        email: dataSignUp.email,
        password: dataSignUp.password,
        options: {
          emailRedirectTo: getAuthRedirectUrl(PATHS.verifyEmail),
        },
      });
      if (error) throw error;
      return data;
    },
    "sign-up",
  );
};