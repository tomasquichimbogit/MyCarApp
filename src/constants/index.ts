import { createClient } from '@supabase/supabase-js';

export const apiKeySupabase = import.meta.env.VITE_SUPABASE_KEY as string;
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
export const supabase = createClient(supabaseUrl, apiKeySupabase);

export const authDomainFirebase = import.meta.env.VITE_AUTH_DOMAIN as string;
export const projectIdFirebase = import.meta.env.VITE_PROJECT_ID as string;
export const storageBucketFirebase = import.meta.env.VITE_STORAGE_BUCKET as string;
export const messagingSenderIdFirebase = import.meta.env.VITE_MESSAGING_SENDER_ID as string;
export const apiKeyFirebase = import.meta.env.VITE_FIREBASE_API_KEY as string;
export const vapidKeyFirebase = import.meta.env.VITE_FIREBASE_VAPID_KEY as string;
export const appIdFirebase = import.meta.env.VITE_APP_ID as string;