import { IconCarSuv } from "@/assets/svg";
import { PATHS } from "@/router/paths";
import { FilePenLine, HomeIcon, MapPinIcon, UserIcon, WrenchIcon } from "lucide-react";



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
        icon: <IconCarSuv className={classNames} transform="scale(-1, 1)" />,
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
        label: "Mis talleres de confianza",
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
      {
        label: "Mi información",
        key: PATHS.userInformation,
        path: PATHS.userInformation,
        icon: <UserIcon className={classNames} />,
        onClick: () => onClick?.(PATHS.userInformation),
      },
    ];
};
