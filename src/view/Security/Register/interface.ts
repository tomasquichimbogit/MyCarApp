import { z } from "zod";

export interface IRegisterUserForm {
  email: string;
  password: string;
}

export const registerUserFormSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(6),
});
