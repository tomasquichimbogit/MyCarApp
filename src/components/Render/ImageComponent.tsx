import { useEffect, useMemo, useState } from 'react';
import { Button, Image, Popconfirm, Progress, theme, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';
import { IMG_FALLBACK } from '@/constants';
import { useSignedImageUrl } from '@/hooks/useSignedImageUrl';
import { useImageStore } from '@/store/useImageStore';
import { UploadImageComponent } from './UploadImage';
import { deleteStorageImage, type IUploadedVehicleImage } from './UploadImages/uploadImages.service';

type ImageComponentProps = {
    bucket: string;
    path: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    preview?: boolean;
    style?: CSSProperties;
    uploadOnError?: boolean;
    showImageActions?: boolean;
    uploadOnEdit?: boolean;
    deleteFromStorage?: boolean;
    onEditImage?: () => Promise<void> | void;
    onDeleteImage?: () => Promise<void> | void;
    onImageUploaded?: (data: IUploadedVehicleImage) => Promise<void> | void;
    onErrorImageUploaded?: (data: IUploadedVehicleImage) => Promise<void> | void;
};

type LoadingPlaceholderProps = {
    percent?: number;
    label: string;
    borderRadius: number;
    labelColor?: string;
};

const LoadingPlaceholder = ({ percent, label, borderRadius, labelColor }: LoadingPlaceholderProps) => (
    <div
        style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: 16,
            boxSizing: 'border-box',
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius,
        }}
    >
        {typeof percent === 'number' && (
            <Progress
                percent={percent}
                showInfo
                style={{ width: '80%', margin: 0 }}
            />
        )}
        {typeof percent !== 'number' && (
            <Progress percent={undefined} showInfo={false} status="active" style={{ width: '80%', margin: 0 }} />
        )}
        <span style={{ fontSize: 13, color: labelColor }}>{label}</span>
    </div>
);

export const ImageComponent = ({
    bucket,
    path,
    alt,
    width,
    height,
    preview = true,
    style,
    uploadOnError = false,
    showImageActions = false,
    uploadOnEdit = false,
    deleteFromStorage = false,
    onEditImage,
    onDeleteImage,
    onImageUploaded,
    onErrorImageUploaded,
}: ImageComponentProps) => {
    const { token } = theme.useToken();
    const { url, loading, error } = useSignedImageUrl(bucket, path);
    const removeImageCacheEntry = useImageStore((state) => state.removeEntry);
    const [fetchPercent, setFetchPercent] = useState(0);
    const [uploadedImage, setUploadedImage] = useState<{ key: string; url: string } | null>(null);
    const [editingImageKey, setEditingImageKey] = useState<string | null>(null);
    const [deletedImageKey, setDeletedImageKey] = useState<string | null>(null);

    const imageStyles = useMemo(
        () => ({
            root: { borderRadius: token.borderRadiusLG },
            image: { borderRadius: token.borderRadiusLG },
            cover: { borderRadius: token.borderRadiusLG },
        }),
        [token.borderRadiusLG],
    );

    useEffect(() => {
        if (!loading) return;

        let active = true;
        let value = 0;

        const tick = () => {
            if (!active) return;

            value = Math.min(value + Math.random() * 8 + 2, 90);
            setFetchPercent(value);

            if (value < 90) {
                setTimeout(tick, 200);
            }
        };

        const timer = setTimeout(tick, 200);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [loading, bucket, path]);

    const imageKey = `${bucket}/${path}`;
    const isEditingImage = editingImageKey === imageKey;
    const isDeletedImage = deletedImageKey === imageKey;
    const uploadedUrl = uploadedImage?.key === imageKey ? uploadedImage.url : null;
    const imageUrl = isDeletedImage ? null : uploadedUrl ?? url;
    const isFetchingUrl = loading || !imageUrl;
    const resolvedFetchPercent = loading ? fetchPercent : 100;
    const uploadItemKey = path.replace(/\.[^/.]+$/, '');
    const wrapperStyle: CSSProperties = {
        position: 'relative',
        display: 'inline-block',
        width: width ?? '100%',
        height,
        lineHeight: 0,
    };

    const imageActionStyle: CSSProperties = {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
        display: 'flex',
        gap: 6,
        padding: 4,
        borderRadius: token.borderRadiusLG,
        background: 'rgba(0, 0, 0, 0.42)',
        backdropFilter: 'blur(8px)',
        lineHeight: 1,
    };

    const handleUploadedImage = async (
        data: IUploadedVehicleImage,
        extraHandler?: (data: IUploadedVehicleImage) => Promise<void> | void,
    ) => {
        if (data.signedUrl) {
            setUploadedImage({ key: imageKey, url: data.signedUrl });
        }

        setEditingImageKey(null);
        await onImageUploaded?.(data);
        await extraHandler?.(data);
    };

    const handleEditImage = async () => {
        if (uploadOnEdit) {
            setEditingImageKey(imageKey);
            return;
        }

        await onEditImage?.();
    };

    const handleDeleteImage = async () => {
        if (deleteFromStorage) {
            await deleteStorageImage(path, bucket);
            removeImageCacheEntry(imageKey);
            setUploadedImage(null);
            setDeletedImageKey(imageKey);
        }

        await onDeleteImage?.();
    };

    const shouldShowImageActions = showImageActions && !isFetchingUrl && !isEditingImage;

    if (isDeletedImage && uploadOnError) {
        return (
            <UploadImageComponent
                bucketName={bucket}
                itemKey={uploadItemKey}
                width={width}
                height={height}
                onUploaded={handleUploadedImage}
            />
        );
    }

    if (error && !uploadedUrl) {
        if (uploadOnError) {
            return (
                <UploadImageComponent
                    bucketName={bucket}
                    itemKey={uploadItemKey}
                    width={width}
                    height={height}
                    onUploaded={(data) => handleUploadedImage(data, onErrorImageUploaded)}
                />
            );
        }

        return (
            <Image
                width={width}
                height={height}
                alt={alt ?? path}
                styles={imageStyles}
                style={style}
                src="error"
                fallback={IMG_FALLBACK}
                preview={false}
            />
        );
    }

    if (!bucket || !path) {
        return (
            <Image
                width={width}
                height={height}
                alt={alt ?? path}
                styles={imageStyles}
                style={style}
                preview={false}
                placeholder={
                    <LoadingPlaceholder borderRadius={token.borderRadiusLG} label="No hay imagen" />
                }
            />
        );
    }

    if (isEditingImage) {
        return (
            <UploadImageComponent
                bucketName={bucket}
                itemKey={uploadItemKey}
                width={width}
                height={height}
                onUploaded={handleUploadedImage}
            />
        );
    }

    return (
        <div style={wrapperStyle}>
            {shouldShowImageActions && (
                <div style={imageActionStyle}>
                    {(uploadOnEdit || onEditImage) && (
                        <Tooltip title="Editar imagen">
                            <Button
                                type="text"
                                size="small"
                                shape="circle"
                                icon={<EditOutlined />}
                                onClick={handleEditImage}
                                style={{ color: '#fff' }}
                            />
                        </Tooltip>
                    )}
                    {(deleteFromStorage || onDeleteImage) && (
                        <Popconfirm
                            title="Eliminar imagen"
                            description="Esta accion eliminara la imagen."
                            okText="Eliminar"
                            cancelText="Cancelar"
                            okButtonProps={{ danger: true }}
                            onConfirm={handleDeleteImage}
                        >
                            <Tooltip title="Eliminar imagen">
                                <Button
                                    danger
                                    type="text"
                                    size="small"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    style={{ color: token.colorError }}
                                />
                            </Tooltip>
                        </Popconfirm>
                    )}
                </div>
            )}
            <Image
                width={width}
                height={height}
                alt={alt ?? path}
                styles={imageStyles}
                style={{ maxWidth: '100%', ...style }}
                src={isFetchingUrl ? undefined : imageUrl}
                preview={preview && !isFetchingUrl}
                fallback={IMG_FALLBACK}
                placeholder={
                    isFetchingUrl ? (
                        <LoadingPlaceholder
                            borderRadius={token.borderRadiusLG}
                            percent={resolvedFetchPercent}
                            label={`Cargando ${resolvedFetchPercent}%`}
                        />
                    ) : (
                        <LoadingPlaceholder borderRadius={token.borderRadiusLG} label="Cargando imagen..." />
                    )
                }
            />
        </div>
    );
};
