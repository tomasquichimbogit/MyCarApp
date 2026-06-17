import { useEffect, useMemo, useState } from 'react';
import { Image, Progress, theme } from 'antd';
import type { CSSProperties } from 'react';
import { IMG_FALLBACK } from '@/constants';
import { useSignedImageUrl } from '@/hooks/useSignedImageUrl';

type ImageComponentProps = {
    bucket: string;
    path: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    preview?: boolean;
    style?: CSSProperties;
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
}: ImageComponentProps) => {
    const { token } = theme.useToken();
    const { url, loading, error } = useSignedImageUrl(bucket, path);
    const [fetchPercent, setFetchPercent] = useState(0);

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

    const isFetchingUrl = loading || !url;
    const resolvedFetchPercent = loading ? fetchPercent : 100;

    if (error) {
        return (
            <Image
                width={width}
                height={height}
                alt={alt ?? path}
                styles={imageStyles}
                style={style}
                preview={false}
                placeholder={
                    <LoadingPlaceholder
                        borderRadius={token.borderRadiusLG}
                        label={`Error: ${error.message}`}
                        labelColor={token.colorError}
                    />
                }
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

    return (
        <Image
            width={width}
            height={height}
            alt={alt ?? path}
            styles={imageStyles}
            style={{ maxWidth: '100%', ...style }}
            src={isFetchingUrl ? undefined : url}
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
    );
};
