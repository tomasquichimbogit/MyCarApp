import { HomeUIView } from "./HomeUI.view"
import { useHomeUI } from "./HomeUI.hook";

export const HomeUI = () => {   
    const hook = useHomeUI();
    return (
        <HomeUIView {...hook} />
    )
}