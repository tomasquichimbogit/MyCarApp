import { ConfigProvider, theme } from 'antd';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { QueryProvider } from './QueryProvider';
import { ModalProvider } from 'tomascomponents';

type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
    mode: ThemeMode;
    toggleMode: () => void;
}

const THEME_STORAGE_KEY = 'mycarapp-theme-mode';
const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

const getInitialMode = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light';

    const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedMode === 'light' || savedMode === 'dark') return savedMode;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeMode = (): ThemeModeContextValue => {
    const context = useContext(ThemeModeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within Provider');
    }
    return context;
};

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;
    const [mode, setMode] = useState<ThemeMode>(getInitialMode);


    useEffect(() => {
        window.localStorage.setItem(THEME_STORAGE_KEY, mode);
        document.documentElement.style.colorScheme = mode;
    }, [mode]);

    const themeModeContextValue = useMemo(
        () => ({
            mode,
            toggleMode: () => setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark')),
        }),
        [mode],
    );

    const isDarkMode = mode === 'dark';

    return (
        <ThemeModeContext.Provider value={themeModeContextValue}>
            <ConfigProvider
                theme={{
                    algorithm: [isDarkMode ? darkAlgorithm : defaultAlgorithm, compactAlgorithm],
                    token: {
                        colorLink: '#1890ff',
                    },
                }}
            >
                <QueryProvider>
                    <ModalProvider>
                        <div
                            style={{
                                minHeight: '100vh',
                                backgroundColor: isDarkMode ? '#141414' : '#f5f5f5',
                                color: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.88)',
                            }}
                        >
                            {children}
                        </div>
                    </ModalProvider>
                </QueryProvider>
            </ConfigProvider>
        </ThemeModeContext.Provider>
    );
};