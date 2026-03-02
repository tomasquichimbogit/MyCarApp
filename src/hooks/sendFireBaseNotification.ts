import { requestForToken, showLocalNotification } from "../firebaseConfig";

export interface ISendFireBaseNotificationResult {
    fcmToken: string | null;
    notificationSent: boolean;
}

const canUseNotifications = (): boolean =>
    typeof window !== "undefined" && "Notification" in window;

export const sendFireBaseNotification = async (
    title = "MyCarApp",
    body = "Notificacion local de prueba"
): Promise<ISendFireBaseNotificationResult> => {
    if (!canUseNotifications()) {
        return { fcmToken: null, notificationSent: false };
    }

    const fcmToken = await requestForToken();
    if (Notification.permission !== "granted") {
        return { fcmToken, notificationSent: false };
    }

    const notificationSent = await showLocalNotification(title, body);
    return { fcmToken, notificationSent };
};


export interface IUseSendFireBaseNotification {
    sendFireBaseNotification: (title: string, body: string) => Promise<ISendFireBaseNotificationResult>;
}

export const useSendFireBaseNotification = (): IUseSendFireBaseNotification => {
    return {
        sendFireBaseNotification: sendFireBaseNotification,
    }
}