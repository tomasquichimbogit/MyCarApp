import { CustomFooterModal } from "./CustomFooterModal";
export interface IConfirmDeleteComponent {
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}
export const ConfirmDeleteComponent = ({ description, onConfirm, onCancel, isLoading }: IConfirmDeleteComponent) => {

  console.log('isLoading =>',isLoading);

  return <div className="flex flex-col gap-2 min-w-[300px]">
    <p>{description}</p>
    <CustomFooterModal onCancel={onCancel} onConfirm={onConfirm} loading={isLoading} />
  </div>
}
