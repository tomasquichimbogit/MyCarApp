import { useVerifyEmailUI } from "./VerifyEmailUI.hook";
import { VerifyEmailView } from "./VerifyEmailUI.view";

export const VerifyEmailUI = () => {
    const hookProps = useVerifyEmailUI();
    return <VerifyEmailView {...hookProps} />;
};
