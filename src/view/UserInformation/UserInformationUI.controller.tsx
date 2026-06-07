import { useUserInformationUIHook } from "./UserInformationUI.hook";
import { UserInformationUIView } from "./UserInformationUI.view";

export const UserInformationUI = () => {
  const hook = useUserInformationUIHook();
  return <UserInformationUIView {...hook} />;
};
