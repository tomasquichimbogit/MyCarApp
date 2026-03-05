import { useHomeUI } from "./HomeUI.hook";
import { HomeUIView } from "./HomeUI.view";

export const HomeUI = () => {   
    const hook = useHomeUI();
    return (
        <HomeUIView {...hook} />
    )
}