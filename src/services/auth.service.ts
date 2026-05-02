import { API_KEY_SUPABASE, SUPABASE, SUPABASE_URL } from "../constants";
import type { ILoginForm } from "../view/Security/Login/interface";
import { useMutation } from "@tanstack/react-query";
import { useApiPostMutation } from "../config/axiosMethods";

export const useSignInMutation = () => {
  return useApiPostMutation<ILoginForm>(
    true,
    async (dataSignIn) => {
      const { data, error } = await SUPABASE.auth.signInWithPassword({
        email: dataSignIn.email,
        password: dataSignIn.password,
      });
      if (error) throw error;
      return data;
    },
    "sign-in",
  );
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (dataSignUp: ILoginForm) => {
      console.log("supabaseUrl =>", SUPABASE_URL);
      console.log("apiKeySupabase =>", API_KEY_SUPABASE);
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