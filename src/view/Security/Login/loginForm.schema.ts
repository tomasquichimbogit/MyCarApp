import { z } from "zod";
export const loginFormSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(6),
});