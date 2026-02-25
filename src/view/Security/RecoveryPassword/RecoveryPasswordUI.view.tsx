import type { IRecoveryPasswordUI } from "./RecoveryPasswordUI.hook"
import { Button } from "tomascomponents";
import { Link } from "react-router-dom";

export const RecoveryPasswordUIView = ({
    newPassword,
    confirmPassword,
    message,
    isLoading,
    setNewPassword,
    setConfirmPassword,
    recoveryPassword,
}: IRecoveryPasswordUI) => {
    return (
        <div>
            <h1>Recovery Password</h1>
            <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <br />
            <Button onClick={recoveryPassword} title={isLoading ? "Updating..." : "Update Password"} />
            {message ? <p>{message}</p> : null}
            <div className="mt-2">
                <Link to="/login">Back to login</Link>
            </div>
        </div>
    )
}