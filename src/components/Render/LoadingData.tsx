import { Spin } from "antd";

export interface ILoadingDataProps {
  loading: boolean;
  size?: "small" | "large" | "default";
  message?: string;
}

export const LoadingData = ({ loading, size = "small", message }: ILoadingDataProps) => {
  if (!loading) return null;
  return (
    <div className="flex flex-col justify-center items-center w-full gap-2">
      <Spin size={size} spinning={loading} />
      {message && <small className="text-gray-500 text-xs">{message}</small>}
    </div>
  );
};
