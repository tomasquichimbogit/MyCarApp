import { useEffect } from "react";
import { listenForegroundMessages } from "../firebaseConfig";

export const useForegroundMessages = (): void => {
    useEffect(() => {
        let unsubscribe: (() => void) | undefined;
        const handleBackgroundMessage = (event: MessageEvent) => {
            if (event.data?.type === "FIREBASE_BACKGROUND_MESSAGE") {
                console.log("Background payload en app:", event.data.payload);
                alert(`Background payload en app: ${event.data.payload}`);
            }
        };

        listenForegroundMessages()
            .then((cleanup) => {
                unsubscribe = cleanup;
            })
            .catch((error) => {
                console.log("No se pudo inicializar listener de notificaciones", error);
            });

        navigator.serviceWorker?.addEventListener("message", handleBackgroundMessage);
        window.addEventListener("message", handleBackgroundMessage as EventListener);

        return () => {
            navigator.serviceWorker?.removeEventListener("message", handleBackgroundMessage);
            window.removeEventListener("message", handleBackgroundMessage as EventListener);
            unsubscribe?.();
        };
    }, []);
};
