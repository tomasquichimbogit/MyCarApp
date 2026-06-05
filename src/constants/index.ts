import { createClient } from '@supabase/supabase-js';

export const API_KEY_SUPABASE = import.meta.env.VITE_SUPABASE_KEY as string;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
export const SUPABASE = createClient(SUPABASE_URL, API_KEY_SUPABASE);
export const AUTH_DOMAIN_FIREBASE = import.meta.env.VITE_AUTH_DOMAIN as string;
export const PROJECT_ID_FIREBASE = import.meta.env.VITE_PROJECT_ID as string;
export const STORAGE_BUCKET_FIREBASE = import.meta.env.VITE_STORAGE_BUCKET as string;
export const MESSAGING_SENDER_ID_FIREBASE = import.meta.env.VITE_MESSAGING_SENDER_ID as string;
export const API_KEY_FIREBASE = import.meta.env.VITE_FIREBASE_API_KEY as string;
export const VAPID_KEY_FIREBASE = import.meta.env.VITE_FIREBASE_VAPID_KEY as string;
export const APP_ID_FIREBASE = import.meta.env.VITE_APP_ID as string;

export const LOCAL_STORAGE_KEYS = {
    REFRESH_TOKEN: 'refresh_token',
}