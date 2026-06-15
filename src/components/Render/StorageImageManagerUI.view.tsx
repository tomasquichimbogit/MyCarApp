import { EditOutlined } from "@ant-design/icons";
import { Button as AntdButton, Image } from "antd";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useState } from "react";
import { useModal } from "tomascomponents";
import { IMG_FALLBACK } from "@/constants";
import UploadImageUI from "@/components/Render/UploadImages/UploadImageUI.view";
import {
  refreshTokenBuketAccessCache,
  useTokenBuketAccess,
} from "@/hooks/useTokenBuketAccess";

interface StorageImageManagerUIProps {
  itemKey: string | number;
  bucketName: string;
  modalTitle: string;
  imageAlt: string;
  wrapperClassName?: string;
  editButtonStyle?: React.CSSProperties;
  invalidateQueryKey?: QueryKey;
}

export const StorageImageManagerUI = ({
  itemKey,
  bucketName,
  modalTitle,
  imageAlt,
  wrapperClassName = "relative w-full h-full min-h-[150px] pt-0.5 pb-0.5",
  editButtonStyle,
  invalidateQueryKey,
}: StorageImageManagerUIProps) => {
  const { openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const [reloadImageKey, setReloadImageKey] = useState(0);

  const { imageUrl, isError } = useTokenBuketAccess({
    bucketName,
    itemKey,
    reloadKey: reloadImageKey,
  });

  const openModalUploadImage = () => {
    openModal({
      title: modalTitle,
      content: (
        <UploadImageUI
          maxFiles={1}
          bucketName={bucketName}
          onCancel={() => closeModal()}
          itemKey={String(itemKey)}
          onUploaded={async () => {
            await refreshTokenBuketAccessCache({
              bucketName,
              itemKey,
            });
            setReloadImageKey((prev) => prev + 1);
            if (invalidateQueryKey) {
              await queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
            }
            closeModal();
          }}
        />
      ),
      width: "450px",
      height: "auto",
      footer: <div>test</div>,
    });
  };

  return (
    <div className={wrapperClassName}>
      <Image
        alt={imageAlt}
        width="100%"
        height="100%"
        src={imageUrl}
        fallback={IMG_FALLBACK}
        onClick={isError ? openModalUploadImage : undefined}
        preview={!isError}
        wrapperStyle={{ width: "100%", height: "100%", display: "block", lineHeight: 0 }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          cursor: "pointer",
          borderRadius: 12,
          objectFit: "cover",
        }}
      />
      {!isError && (
        <AntdButton
          type="primary"
          shape="circle"
          variant="solid"
          size="small"
          icon={<EditOutlined />}
          onClick={(event) => {
            event.stopPropagation();
            openModalUploadImage();
          }}
          style={{
            position: "absolute",
            right: 6,
            bottom: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,.25)",
            ...editButtonStyle,
          }}
        />
      )}
    </div>
  );
};

