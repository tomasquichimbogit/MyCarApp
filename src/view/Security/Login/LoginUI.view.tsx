import { Button, FormInput } from "tomascomponents";
import type { ILoginUI } from "./LoginUI.hook";
import { IconCarSuv  } from "../../../assets";

export const LoginUIView = ({
  control,
  handleFormSubmit,
  isSignInPending,
}: ILoginUI) => {
  return (
    <div className="flex-1w-full min-h-0 h-full">
      
      <div className="flex flex-col items-center justify-center gap-2 bg-gray-900 border border-gray-700 min-w-96 h-96 rounded-4xl p-4">
        <div className="shadow-md shadow-white rounded-4xl rotate-12 p-2">
          <div className="flex items-center justify-center">
            <IconCarSuv width={100} height={100} color="white" />
          </div>
        </div>
        <FormInput label="Email" control={control} name="email" placeholder="Email" />
        <FormInput label="Password" control={control} name="password" placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button onClick={handleFormSubmit} title="Login" loading={isSignInPending} />
        </div>
      </div>
    </div>

  );
};