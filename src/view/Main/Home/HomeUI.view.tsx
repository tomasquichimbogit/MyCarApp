import type { IHomeUI } from "./HomeUI.hook";

export const HomeUIView = ({ tokenFcm }: IHomeUI) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h1>Home</h1>
            <strong>Token FCM: </strong>
            <span className="block break-all">{tokenFcm}</span>
        </div>
    );
};