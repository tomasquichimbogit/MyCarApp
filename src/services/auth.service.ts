import { API_KEY_SUPABASE, SUPABASE, SUPABASE_URL } from "../constants";
import type { ILoginForm, ISignInResponse } from "../view/Security/Login/interface";
import type { IRegisterUserForm } from "../view/Security/Register/interface";
import { useApiPostMutation } from "../config/axiosMethods";
import { PATHS } from "@/router/paths";
import { getAuthRedirectUrl } from "@/helper/authRedirect";

type SignUpData = Awaited<ReturnType<typeof SUPABASE.auth.signUp>>["data"];

const functionAsyncSignInWithPassword = async (dataSignIn: ILoginForm): Promise<ISignInResponse> => {
  const { data, error } = await SUPABASE.auth.signInWithPassword(dataSignIn);
  if (error) throw error;
  return data as unknown as ISignInResponse;
};

export const refreshSupabaseSession = async (refreshToken: string): Promise<ISignInResponse> => {
  const { data, error } = await SUPABASE.auth.refreshSession({
    refresh_token: refreshToken,
  });
  if (error) throw error;
  return data as unknown as ISignInResponse;
};

export const signOutSupabase = async (): Promise<void> => {
  const { error } = await SUPABASE.auth.signOut();
  if (error) throw error;
};

export const useSignIn = () => {
  return useApiPostMutation<ILoginForm, ISignInResponse>(
    true,
    async (dataSignIn) => functionAsyncSignInWithPassword(dataSignIn),
    "sign-in",
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