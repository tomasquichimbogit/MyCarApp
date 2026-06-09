import { ConfigProvider } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { QueryProvider } from './QueryProvider';
import { ModalProvider, NotificationProvider } from 'tomascomponents';
import { LocalStorageProvider } from '../store/useLocalStorage';
import { THEME_STORAGE_KEY, ThemeModeContext, type ThemeMode } from '@/hooks/useThemeMode';
import { theme } from 'antd';



const getInitialMode = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light';

    const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedMode === 'light' || savedMode === 'dark') return savedMode;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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

    const isDarkMode = mode === "dark";

    return (
      <ThemeModeContext.Provider value={themeModeContextValue}>
        <ConfigProvider
          theme={{
            algorithm: [isDarkMode ? darkAlgorithm : defaultAlgorithm, compactAlgorithm],
            token: {
              colorLink: "#1890ff",
            },
          }}
        >
          {/* Portal único de notificaciones; en el resto de la app usar useNotify() */}
          <NotificationProvider>
          <QueryProvider>
            <ModalProvider>
              <LocalStorageProvider>
                {/* <div
                  style={{
                    minHeight: "100vh",
                    backgroundColor: isDarkMode ? "#141414" : "#f5f5f5",
                    color: isDarkMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.88)",
                  }}
                > */}
                  {children}
                {/* </div> */}
              </LocalStorageProvider>
            </ModalProvider>
          </QueryProvider>
          </NotificationProvider>
        </ConfigProvider>
      </ThemeModeContext.Provider>
    );
};