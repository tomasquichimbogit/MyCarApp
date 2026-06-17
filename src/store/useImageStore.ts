// useImageStore.ts
// Zustand store para cachear signed URLs. Persiste en localStorage.

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SignedEntry = {
    url: string;
    expiresAt: number; // timestamp ms
};

type ImageStore = {
    cache: Record<string, SignedEntry>;
    setEntry: (key: string, entry: SignedEntry) => void;
    getEntry: (key: string) => SignedEntry | undefined;
    removeEntry: (key: string) => void;
    cleanExpired: () => void;
};

export const useImageStore = create<ImageStore>()(
    persist(
        (set, get) => ({
            cache: {},
            setEntry: (key, entry) =>
                set((s) => ({ cache: { ...s.cache, [key]: entry } })),
            getEntry: (key) => {
                const c = get().cache[key];
                if (!c) return undefined;
                return c;
            },
            removeEntry: (key) =>
                set((s) => {
                    const copy = { ...s.cache };
                    delete copy[key];
                    return { cache: copy };
                }),
            cleanExpired: () =>
                set((s) => {
                    const now = Date.now();
                    const copy: Record<string, SignedEntry> = {};
                    for (const k of Object.keys(s.cache)) {
                        if (s.cache[k].expiresAt > now) copy[k] = s.cache[k];
                    }
                    return { cache: copy };
                }),
        }),
        {
            name: 'supabase-image-signedurl-store', // key in localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);