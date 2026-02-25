import { useRecoveryPasswordUI } from "./RecoveryPasswordUI.hook";
import { RecoveryPasswordUIView } from "./RecoveryPasswordUI.view";

export const RecoveryPasswordUI = () => {
    const hook = useRecoveryPasswordUI();
    return (
        <RecoveryPasswordUIView {...hook} />
    )
}