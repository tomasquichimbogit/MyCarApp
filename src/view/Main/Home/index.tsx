import { IconCarSuv } from "@/assets/svg";
import { getMenuItems } from "@/constants/menu";
import { PATHS } from "@/router/paths";
import { MapPinIcon } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "tomascomponents";
export const HomeUI = () => {


  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const filterHome = useMemo(() => {
    return getMenuItems("w-24 h-24 text-desert-sand").filter((item) => item.path !== PATHS.home && item.path !== PATHS.adventure);
  }, []);

  return (
    <div className="w-full min-h-full h-full flex flex-col gap-4 justify-center items-center p-2">
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
      <div className="flex justify-center items-center bg-gray-200/10 rounded-md p-2">
        <div className="flex-1">
          <Button
            title={
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                <IconCarSuv className="w-12 h-12" transform="scale(-1, 1)" />
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
  );
};
