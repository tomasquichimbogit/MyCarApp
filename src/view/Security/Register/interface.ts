import { z } from "zod";
export interface IRegisterUserForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerSchema = z.object({
    email: z.string({ error: "Email es requerido" }).email("Email inválido"),
    password: z.string({ error: "Contraseña es requerida" }).min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string({ error: "Confirmar contraseña es requerida" }).min(6, "La contraseña debe tener al menos 6 caracteres"),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Las contraseñas no coinciden",
            path: ["confirmPassword"],
        });
    }
});

export interface IRegisterRequest {
    email: string;
    password: string;
}



export interface IRegisterResponse {
    user: IUser;
    session: unknown;
}

export interface IUser {
    id: string;
    aud: string;
    role: string;
    email: string;
    invited_at: Date;
    phone: string;
    confirmation_sent_at: Date;
    app_metadata: AppMetadata;
    user_metadata: UserMetadata;
    identities: unknown[];
    created_at: Date;
    updated_at: Date;
    is_anonymous: boolean;
}

export interface AppMetadata {
    provider: string;
    providers: string[];
}

export interface UserMetadata {
    [key: string]: unknown;
}






