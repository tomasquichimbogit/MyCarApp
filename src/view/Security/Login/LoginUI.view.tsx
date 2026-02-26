import { Button, FormInput } from "tomascomponents";
import type { ILoginUI } from "./LoginUI.hook";

export const LoginUIView = ({
  control,
  handleFormSubmit,
  isSignInPending,
}: ILoginUI) => {
  return (
    <div className="flex-1w-full min-h-0 h-full">
      <div className="flex flex-col items-center justify-center gap-2 bg-gray-900 opacity-50 border border-gray-500 min-w-96 h-96 rounded-4xl p-4">
        <FormInput label="Email" control={control} name="email" placeholder="Email" />
        <FormInput label="Password" control={control} name="password" placeholder="Password" />
        <div className="flex justify-center">
          <Button onClick={handleFormSubmit} title="Login" loading={isSignInPending} />
        </div>
      </div>
    </div>

  );
};