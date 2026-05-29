import { useRegisterUserUI } from "./RegisterUserUI.hook";
import { RegisterUserUIView } from "./RegisterUserUI.view"

export const RegisterUserUI = () => {
    const hook = useRegisterUserUI();
    return (
        <RegisterUserUIView {...hook} />
    )
}