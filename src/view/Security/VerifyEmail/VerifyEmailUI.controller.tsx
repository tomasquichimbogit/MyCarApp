import { useVerifyEmailUI } from "./VerifyEmailUI.hook";
import { VerifyEmailUIView } from "./VerifyEmailUI.view";

export const VerifyEmailUI = () => {
  const hook = useVerifyEmailUI();
  return <VerifyEmailUIView {...hook} />;
};