import { useSendFireBaseNotification } from "../../../../hooks/sendFireBaseNotification";
import { useSidebarStore } from "../../../../store/useSidebarStore";

export interface IHeaderUI {
    toggleOpen: () => void;
    testNotification: () => Promise<void>;
}

export const useHeaderUI = (): IHeaderUI => {
    const { toggleOpen } = useSidebarStore();

    const { sendFireBaseNotification } = useSendFireBaseNotification();


    const testNotification = async () => {
        const result = await sendFireBaseNotification("Test Notification", "This is a test notification");
        console.log(result);
    }

    return { toggleOpen, testNotification };
}