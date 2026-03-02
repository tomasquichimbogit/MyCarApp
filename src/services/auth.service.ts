import { apiKeySupabase, supabase, supabaseUrl } from "../constants";
import type { ILoginForm } from "../view/Security/Login/interface";
import { useMutation } from "@tanstack/react-query";



export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: async (dataSignUp: ILoginForm) => {
            console.log('supabaseUrl =>',supabaseUrl);
            console.log('apiKeySupabase =>',apiKeySupabase);
            const { data, error } = await supabase.auth.signUp({
                email: dataSignUp.email,
                password: dataSignUp.password,
            });
            return { data, error };
        },
    });
};

export const useSignInMutation = () => {
    return useMutation({
        mutationFn: async (dataSignIn: ILoginForm) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: dataSignIn.email,
                password: dataSignIn.password,
            });
            return { data, error };
        },
    });
};