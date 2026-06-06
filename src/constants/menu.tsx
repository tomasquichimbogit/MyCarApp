import { PATHS } from "@/router/paths";
import { CarIcon, FilePenLine, HomeIcon, MapPinIcon, WrenchIcon } from "lucide-react";



export const getMenuItems = (classNames?: string, onClick?: (path: string) => void) => {
    return [
      {
        label: "Inicio",
        key: PATHS.home,
        path: PATHS.home,
        icon: <HomeIcon className={classNames} />,
        onClick: () => onClick?.(PATHS.home),
      },
      {
        label: "Mis vehiculos",
        key: PATHS.vehicles,
        path: PATHS.vehicles,
        icon: <CarIcon className={classNames} />,
        onClick: () => onClick?.(PATHS.vehicles),
      },
      {
        label: "Mis mantenimientos",
        key: PATHS.maintenance,
        path: PATHS.maintenance,
        icon: <FilePenLine className={classNames} />,
        onClick: () => onClick?.(PATHS.maintenance),
      },
      {
        label: "Talleres",
        key: PATHS.workshops,
        path: PATHS.workshops,
        icon: <WrenchIcon className={classNames} />,
        onClick: () => onClick?.(PATHS.workshops),
      },
      {
        label: "Aventura",
        key: PATHS.adventure,
        path: PATHS.adventure,
        icon: <MapPinIcon className={classNames} />,
        onClick: () => onClick?.(PATHS.adventure),
      },
    ];
};
