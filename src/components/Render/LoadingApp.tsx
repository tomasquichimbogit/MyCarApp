import wheelImageSrc from "@/assets/images/rueda-motcarapp.png";

type LoadingAppProps = {
  className?: string;
  imageClassName?: string;
  size?: number;
  label?: string;
  /** Ocupa toda la altura de la pantalla cuando es true (por defecto). */
  fullScreen?: boolean;
};

export const LoadingApp = ({
  className,
  imageClassName,
  size = 96,
  label = "Cargando...",
  fullScreen = true,
}: LoadingAppProps) => {
  return (
    <div
      className={[
        "flex w-full flex-col items-center justify-center gap-3 bg-transparent",
        fullScreen ? "min-h-screen" : "py-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <img
        src={wheelImageSrc}
        alt=""
        aria-hidden
        draggable={false}
        className={["animate-spin", imageClassName].filter(Boolean).join(" ")}
        style={{ width: size, height: size }}
      />
      <span className="text-sm font-medium text-orange-rally">{label}</span>
    </div>
  );
};
