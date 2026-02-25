import { Button } from "tomascomponents";
import type { ILoginUI } from "./LoginUI.hook";
import { Link } from "react-router-dom";

export const LoginUIView = ({
  email,
  password,
  message,
  isLoading,
  setEmail,
  setPassword,
  onSubmit,
}: ILoginUI) => {
  return (
    <div className="border border-white rounded-md p-4">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <Button onClick={onSubmit} title={isLoading ? "Loading..." : "Login"} />
      {message ? <p>{message}</p> : null}
      <div className="mt-2">
        <Link to="/recovery-password">Forgot password?</Link>
      </div>
    </div>
  );
};