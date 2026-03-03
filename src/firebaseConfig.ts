import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import { apiKeyFirebase, appIdFirebase, authDomainFirebase, messagingSenderIdFirebase, projectIdFirebase, storageBucketFirebase, vapidKeyFirebase } from "./constants";

const firebaseConfig = {
    apiKey: apiKeyFirebase,
    authDomain: authDomainFirebase,
    projectId: projectIdFirebase,
    storageBucket: storageBucketFirebase,
    messagingSenderId: messagingSenderIdFirebase,
    appId: appIdFirebase,
};

const app = initializeApp(firebaseConfig);

export const showLocalNotification = async (title: string, body: string): Promise<boolean> => {
    if (typeof window === "undefined" || !("Notification" in window) || Notification.permission !== "granted") {
        return false;
    }

    const icon = `${import.meta.env.BASE_URL}vite.svg`;

    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                await registration.showNotification(title, { body, icon });
                return true;
            }
        } catch (error) {
            console.log("No se pudo mostrar notificacion por service worker", error);
        }
    }

    new Notification(title, { body, icon });
    return true;
};

const postFirebaseConfigToServiceWorker = (registration: ServiceWorkerRegistration) => {
    const worker = registration.active ?? registration.waiting ?? registration.installing;
    if (!worker) {
        return;
    }

    const sendConfig = () => {
        worker.postMessage({
            type: "FIREBASE_CONFIG",
            payload: firebaseConfig,
        });
    };

    if (worker.state === "activated") {
        sendConfig();
        return;
    }

    worker.addEventListener("statechange", () => {
        if (worker.state === "activated") {
            sendConfig();
        }
    });
};

export const requestForToken = async (): Promise<string | null> => {
    const supported = await isSupported();
    if (!supported || typeof window === "undefined" || !("Notification" in window)) {
        
        return null;
    }

    if (!window.isSecureContext) {
        console.log("FCM requiere contexto seguro (HTTPS o localhost).");
        return null;
    }

    if (!("serviceWorker" in navigator)) {
        return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        return null;
    }

    try {
        const messaging = getMessaging(app);
        const serviceWorkerPath = `${import.meta.env.BASE_URL}firebase-messaging-sw.js`;
        const registration = await navigator.serviceWorker.register(serviceWorkerPath, {
            scope: import.meta.env.BASE_URL,
        });
        const readyRegistration = await navigator.serviceWorker.ready;
        postFirebaseConfigToServiceWorker(registration);
        postFirebaseConfigToServiceWorker(readyRegistration);
        const currentToken = await getToken(messaging, {
            vapidKey: vapidKeyFirebase,
            serviceWorkerRegistration: readyRegistration,
        });

        return currentToken || null;
    } catch (error) {
        console.log("No se pudo obtener token FCM", error);
        return null;
    }
};

export const listenForegroundMessages = async (): Promise<(() => void) | undefined> => {
    const supported = await isSupported();
    if (!supported || typeof window === "undefined") {
        return undefined;
    }

    const messaging = getMessaging(app);
    return onMessage(messaging, (payload) => {
        const title = payload.notification?.title ?? "MyCarApp";
        const body = payload.notification?.body ?? "";
        console.log("Notificacion foreground:", payload);
        console.log("Foreground title:", title);
        console.log("Foreground body:", body);
        void showLocalNotification(title, body);
        window.alert(body ? `${title}: ${body}` : title);
    });
};