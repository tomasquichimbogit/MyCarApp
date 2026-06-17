import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, theme } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { uploadVehicleImages, type IUploadedVehicleImage } from './UploadImages/uploadImages.service';
import type { CSSProperties } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type UploadImageComponentProps = {
    bucketName: string;
    itemKey: string;
    width?: number | string;
    height?: number | string;
    onUploaded?: (data: IUploadedVehicleImage) => Promise<void> | void;
};

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const UploadImageComponent = ({
    bucketName,
    itemKey,
    width = '100%',
    height = 160,
    onUploaded,
}: UploadImageComponentProps) => {
    const { token } = theme.useToken();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        return () => {
            fileList.forEach((file) => {
                if (file.url?.startsWith('blob:')) {
                    URL.revokeObjectURL(file.url);
                }
            });
        };
    }, [fileList]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview && file.originFileObj) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleUpload: UploadProps['customRequest'] = async ({ file, onError, onProgress, onSuccess }) => {
        const uploadFile = file as File;

        try {
            onProgress?.({ percent: 40 });
            const [uploadedFile] = await uploadVehicleImages({
                files: [uploadFile],
                itemKey,
                bucketName,
                createSignedUrl: true,
            });

            onProgress?.({ percent: 100 });
            onSuccess?.(uploadedFile);
            await onUploaded?.(uploadedFile);
        } catch (error) {
            onError?.(error instanceof Error ? error : new Error(String(error)));
        }
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1));
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none', cursor: 'pointer' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Subir imagen</div>
        </button>
    );

    const wrapperStyle = {
        '--upload-image-width': typeof width === 'number' ? `${width}px` : width,
        '--upload-image-height': typeof height === 'number' ? `${height}px` : height,
        '--upload-image-radius': `${token.borderRadiusLG}px`,
    } as CSSProperties;

    return (
        <div className="single-image-upload" style={wrapperStyle}>
            <Upload
                accept="image/*"
                className="single-image-upload__control"
                customRequest={handleUpload}
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                multiple={false}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    styles={{ root: { display: 'none' } }}
                    preview={{
                        open: previewOpen,
                        onOpenChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
            <style>
                {`
                    .single-image-upload .single-image-upload__control,
                    .single-image-upload .single-image-upload__control .ant-upload-list,
                    .single-image-upload .single-image-upload__control .ant-upload-list-item-container,
                    .single-image-upload .single-image-upload__control .ant-upload.ant-upload-select-picture-card {
                        width: var(--upload-image-width);
                        height: var(--upload-image-height);
                    }

                    .single-image-upload .single-image-upload__control .ant-upload-list-item,
                    .single-image-upload .single-image-upload__control .ant-upload.ant-upload-select-picture-card {
                        border-radius: var(--upload-image-radius);
                    }
                `}
            </style>
        </div>
    );
};