import { z } from "zod";

export interface IVerifyEmailForm {
  email: string;
  verificationCode: string;
}

export const verifyEmailFormSchema = z.object({
  email: z.string().email().min(5),
  verificationCode: z.string().min(4, "Ingresa el código enviado a tu correo"),
});
