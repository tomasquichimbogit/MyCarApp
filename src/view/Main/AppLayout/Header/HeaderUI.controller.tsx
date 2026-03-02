import { useHeaderUI } from "./HeaderUI.hook";
import { HeaderUIView } from "./HeaderUI.view"

export const HeaderUI = () => {
    const hook = useHeaderUI();
    return (
        <HeaderUIView {...hook} />
    )
}