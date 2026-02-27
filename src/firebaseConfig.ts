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

    if (!("serviceWorker" in navigator)) {
        return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        return null;
    }

    const messaging = getMessaging(app);
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    postFirebaseConfigToServiceWorker(registration);
    const currentToken = await getToken(messaging, {
        vapidKey: vapidKeyFirebase,
        serviceWorkerRegistration: registration,
    });

    return currentToken || null;
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
        if (body) {
            window.alert(`${title}: ${body}`);
            return;
        }
        window.alert(title);
    });
};