import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { uploadVehicleImages } from "./uploadImages.service";

const MAX_FILES = 8;

interface UploadImageUIProps {
  maxFiles?: number;
  onCancel?: () => void;
  itemKey: string;
  bucketName?: string;
  onUploaded?: (data: { bucket: string; path: string; signedUrl: string; fileName: string }[]) => Promise<void> | void;
}

export const UploadImageUI = ({ maxFiles = MAX_FILES, onCancel, itemKey, bucketName, onUploaded }: UploadImageUIProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const canUploadMore = fileList.length < maxFiles;

  const handleBeforeUpload: UploadProps["beforeUpload"] = (file) => {
    const localUrl = URL.createObjectURL(file as File);
    const newFile: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: "done",
      url: localUrl,
      originFileObj: file,
    };

    setFileList((prev) => [...prev, newFile].slice(0, maxFiles));
    return Upload.LIST_IGNORE;
  };

  const handleRemove = (uid: string) => {
    setFileList((prev) => {
      const removed = prev.find((item) => item.uid === uid);
      if (removed?.url?.startsWith("blob:")) {
        URL.revokeObjectURL(removed.url);
      }

      return prev.filter((item) => item.uid !== uid);
    });
  };

  useEffect(() => {
    return () => {
      fileList.forEach((item) => {
        if (item.url?.startsWith("blob:")) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [fileList]);

  const uploadButton = useMemo(
    () => (
      <button
        style={{
          border: "1px dashed #b9c2d0",
          borderRadius: 14,
          background: "#ffffff",
          width: "100%",
          minHeight: 130,
          display: "grid",
          placeItems: "center",
          color: "#4b5563",
          cursor: "pointer",
        }}
        type="button"
      >
        <div style={{ display: "grid", placeItems: "center", gap: 8 }}>
          <PlusOutlined style={{ fontSize: 18 }} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Agregar imagen</span>
        </div>
      </button>
    ),
    [],
  );

  //tenemos que limitar la carga al numero indicado en maxFiles
  const showUploadButton = fileList.length < maxFiles;

  const disableUploadButton = fileList.length === 0 || isUploading;

  const handleUpload = async () => {
    try {
      setIsUploading(true);

      const files = fileList
        .map((item) => item.originFileObj as File | undefined)
        .filter((file): file is File => file instanceof File);

      const uploadedFiles = await uploadVehicleImages({
        files,
        itemKey,
        bucketName,
      });

      console.log("Imagenes cargadas a Supabase:", uploadedFiles);
      await onUploaded?.(uploadedFiles);
      onCancel?.();
    } catch (error) {
      console.error("Error al cargar imagenes en Supabase:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center w-full">
        {showUploadButton && (
          <Upload
            accept="image/*"
            beforeUpload={handleBeforeUpload}
            showUploadList={false}
            multiple
            disabled={!canUploadMore}
          >
            {canUploadMore ? uploadButton : null}
          </Upload>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: 12,
            marginTop: 12,
          }}
        >
          {fileList.map((file) => (
            <article
              key={file.uid}
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid #edf2f7",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                background: "#fff",
              }}
            >
              <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#f3f4f6" }}>
                <Image
                  src={file.url}
                  alt={file.name}
                  preview={false}
                  width="100%"
                  height="100%"
                  wrapperStyle={{ width: "100%", height: "100%", display: "block", lineHeight: 0 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                    objectPosition: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setPreviewImage(file.url || "");
                    setPreviewOpen(true);
                  }}
                />
              </div>
              <Button
                danger
                size="small"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(file.uid)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  boxShadow: "0 4px 10px rgba(0,0,0,.2)",
                }}
              />
            </article>
          ))}
        </div>

        {previewImage ? (
          <Image
            src={previewImage}
            style={{ display: "none" }}
            preview={{
              open: previewOpen,
              onOpenChange: setPreviewOpen,
              afterOpenChange: (visible) => {
                if (!visible) {
                  setPreviewImage("");
                }
              },
            }}
          />
        ) : null}
      </section>
      <div className="flex flex-row gap-2 justify-end w-full">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button type="primary" onClick={handleUpload} disabled={disableUploadButton} loading={isUploading}>
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default UploadImageUI;
