import { IconCarSuv } from "@/assets/svg";
import { getMenuItems } from "@/constants/menu";
import { PATHS } from "@/router/paths";
import { MapPinIcon, SprayCanIcon, WrenchIcon,  } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "tomascomponents";
import { Divider } from "antd";

export const HomeUI = () => {


  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const filterHome = useMemo(() => {
    return getMenuItems("w-24 h-24 text-desert-sand").filter((item) => item.path !== PATHS.home && item.path !== PATHS.adventure);
  }, []);

  return (
    <div className="flex min-h-full h-full w-full flex-col items-center justify-center p-2 mt-8">
      <div className="flex w-full max-w-md flex-col gap-0.5">
      <div className="grid grid-cols-2 gap-2">
        {filterHome.map((item) => (
          <div
            onClick={() => handleNavigate(item.path)}
            key={item.key}
            className="flex flex-col items-center gap-2 border-2 border-desert-sand rounded-md p-2 hover:cursor-pointer hover:bg-desert-sand/10 hover:text-carbon-black transition-all duration-300"
          >
            <div>{item.icon}</div>
            <div className="text-orange-rally">{item.label}</div>
          </div>
        ))}
      </div>
      <Divider plain className="home-explore-divider w-full">
        <div className="flex flex-row items-center gap-2 text-led-yellow">
          <IconCarSuv className="w-8 h-8" transform="scale(-1, 1)" />
          Explorar
        </div>
      </Divider>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center bg-gray-200/10 rounded-md p-2">
          <Button
            title={
              <div className="flex items-center gap-2">
                <WrenchIcon className="w-6 h-6" />
                <span className="font-bold text-2xl">Talleres</span>
              </div>
            }
            variant="link"
            color="orange"
            onClick={() => handleNavigate(PATHS.workshops)}
          />
        </div>
        {/* Latoneria */}
        <div className="flex justify-center items-center bg-gray-200/10 rounded-md p-2">
          <Button
            title={
              <div className="flex items-center gap-2">
                <SprayCanIcon className="w-6 h-6" />
                <span className="font-bold text-2xl">Latoneria</span>
              </div>
            }
            variant="link"
            color="orange"
            onClick={() => handleNavigate(PATHS.adventure)}
          />
        </div>
        <div className="flex justify-center items-center bg-gray-200/10 rounded-md p-2">
          <Button
            title={
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                <span className="font-bold text-2xl">Aventura</span>
              </div>
            }
            variant="link"
            color="orange"
            onClick={() => handleNavigate(PATHS.adventure)}
          />
        </div>
      </div>
      </div>
    </div>
  );
};
