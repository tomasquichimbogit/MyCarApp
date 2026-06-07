import { createElement, type CSSProperties, type HTMLAttributes } from "react";
import iconShockAbsorberRowSrc from "./shock-absorber-row.png";

type IconProps = HTMLAttributes<HTMLSpanElement> & {
  /** Rotation in degrees, e.g. 90 or -90 */
  rotate?: number;
  /** Mirror horizontally (like IconCarSuv scale(-1, 1)) */
  flipX?: boolean;
};

const shockAbsorberRowMaskStyle: CSSProperties = {
  WebkitMaskImage: `url(${iconShockAbsorberRowSrc})`,
  maskImage: `url(${iconShockAbsorberRowSrc})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  backgroundColor: "currentColor",
};

const buildTransform = (rotate?: number, flipX?: boolean, extra?: string): string | undefined => {
  const parts: string[] = [];
  if (flipX) parts.push("scaleX(-1)");
  if (rotate != null) parts.push(`rotate(${rotate}deg)`);
  if (extra) parts.push(extra);
  return parts.length ? parts.join(" ") : undefined;
};

/** Raster icon — tint with Tailwind `text-*` (uses currentColor as fill). */
export const IconShockAbsorberRow = ({
  className,
  style,
  rotate,
  flipX,
  ...props
}: IconProps) => {
  const { transform: styleTransform, ...restStyle } = style ?? {};
  const transform = buildTransform(rotate, flipX, styleTransform);

  return createElement("span", {
    role: "img",
    "aria-hidden": true,
    className: ["inline-block shrink-0 size-6 bg-current", className].filter(Boolean).join(" "),
    style: {
      ...shockAbsorberRowMaskStyle,
      ...restStyle,
      ...(transform ? { transform, transformOrigin: "center" } : {}),
    },
    ...props,
  });
};
