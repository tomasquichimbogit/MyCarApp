import { supabase } from "../constants";

export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    return { data, error };
};

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    return { data, error };
};