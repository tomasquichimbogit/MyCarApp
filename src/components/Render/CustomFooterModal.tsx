import { Button } from "tomascomponents"

export interface ICustomFooterModalProps {
    onCancel: () => void;
    onConfirm: () => void;
    titleCancel?: string;
    titleConfirm?: string;
    loading?: boolean;
}

export const CustomFooterModal = ({ onCancel, onConfirm, titleCancel="Cancelar", titleConfirm="Aceptar", loading }: ICustomFooterModalProps) => {
    return (
        <div className="mt-auto flex w-full justify-end gap-2 border-t border-gray-200 pt-3">
            <Button onClick={onCancel} title={titleCancel} variant="outlined" loading={loading===true} />
            <Button onClick={onConfirm} title={titleConfirm} type="primary" loading={loading===true} />
        </div>
    )
}