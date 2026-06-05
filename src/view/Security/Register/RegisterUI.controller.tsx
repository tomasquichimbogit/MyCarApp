import { RegisterView } from "./RegisterUI.view"
import { useRegisterUI } from "./RegisterUI.hook"

export const RegisterUI = () => {
    const hook = useRegisterUI();
    return (
        <RegisterView { ...hook } />
    )
}