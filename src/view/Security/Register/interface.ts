import { z } from "zod";
export interface IRegisterUserForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerSchema = z.object({
    email: z.string({ error: "Email es requerido" }).email("Email inválido"),
    password: z.string({ error: "Contraseña es requerida" }).min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string({ error: "Confirmar contraseña es requerida" }).min(8, "La contraseña debe tener al menos 8 caracteres"),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Las contraseñas no coinciden",
        });
        ctx.addIssue({
            code: "custom",
            message: "Las contraseñas no coinciden",
        });
    }
});


