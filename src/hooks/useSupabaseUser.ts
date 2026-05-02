import { useQuery } from "@tanstack/react-query";
import { SUPABASE } from "../constants";

export const useSupabaseUser = () => {
    return useQuery({
        queryKey: ["supabase", "user"],
        queryFn: async () => {
            const { data, error } = await SUPABASE.auth.getUser();
            if (error) {
                throw error;
            }
            return data.user;
        },
        staleTime: 60_000, // cache user for 1 min
    });
};

export const useSupabaseUserId = () => {
    const { data: user, ...queryState } = useSupabaseUser();
    return {
        user,
        userId: user?.id,
        ...queryState,
    };
};
