import { HeaderUIHook } from "./HeaderUI.hook";
import { HeaderView } from "./HeaderUI.view"

export const HeaderUI = () => { 
    const hook = HeaderUIHook();
    return (
        <HeaderView { ...hook } />
    )
}