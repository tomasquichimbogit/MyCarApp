import { API_KEY_SUPABASE, LOCAL_STORAGE_KEYS, SUPABASE, SUPABASE_URL } from "../constants";
import type { ILoginForm, ISignInResponse } from "../view/Security/Login/interface";
import type { IRegisterResponse, IRegisterUserForm } from "../view/Security/Register/interface";
import { useApiPostMutation } from "../config/axiosMethods";
import { PATHS } from "@/router/paths";
import { getAuthRedirectUrl } from "@/helper/authRedirect";
import { useAuthStore } from "@/store/useAuthStore";

const functionAsyncSignInWithPassword = async (dataSignIn: ILoginForm): Promise<ISignInResponse> => {
  const { data, error } = await SUPABASE.auth.signInWithPassword(dataSignIn);
  if (error) throw error;
  return data as unknown as ISignInResponse;
};

export const syncSupabaseSession = async (
  session: ISignInResponse["session"],
): Promise<void> => {
  const { error } = await SUPABASE.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });
  if (error) throw error;
};

export const ensureSupabaseAuthSession = async (): Promise<string> => {
  const { data: sessionData } = await SUPABASE.auth.getSession();
  if (sessionData.session?.user?.id) {
    return sessionData.session.user.id;
  }

  const storeSession = useAuthStore.getState().user?.session;
  if (storeSession) {
    await syncSupabaseSession(storeSession);
    const { data: userData, error: userError } = await SUPABASE.auth.getUser();
    if (!userError && userData.user?.id) {
      return userData.user.id;
    }
  }

  const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  if (refreshToken) {
    const data = await refreshSupabaseSession(refreshToken);
    await syncSupabaseSession(data.session);
    useAuthStore.getState().setUser(data);
    localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, data.session.refresh_token);
    return data.user.id;
  }

  throw new Error("No hay sesión activa. Inicia sesión nuevamente.");
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
  return useApiPostMutation<IRegisterUserForm, IRegisterResponse>(
    true,
    async (dataSignUp: IRegisterUserForm): Promise<IRegisterResponse> => {
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
      return data as unknown as IRegisterResponse;
    },
    "sign-up",
  );
};


export const useResendVerificationEmail = () => {
  return useApiPostMutation<string, void>(
    true,
    async (email: string) => {
      const { error } = await SUPABASE.auth.resend({
        type: "signup",
        email,
      });
      if (error) throw error;
    },
    "resend-verification-email",
  );
};

// https://qvarghwxgbhowkrgshgq.supabase.co/auth/v1/verify?token=638b6de9154102180857e0d2aa2fc034135f8c0de9863bf44d09a861&type=signup&redirect_to=https%3A%2F%2Ftomasquichimbogit.github.io%2FMyCarApp%2F%23%2Fverify-email