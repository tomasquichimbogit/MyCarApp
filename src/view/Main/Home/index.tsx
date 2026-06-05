import { getMenuItems } from "@/constants/menu";
import { PATHS } from "@/router/paths";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
export const HomeUI = () => {


  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const filterHome = useMemo(() => {
    return getMenuItems("w-24 h-24 text-desert-sand").filter((item) => item.path !== PATHS.home);
  }, []);

  return (
    <div className="w-full min-h-full h-full flex justify-center items-center p-2">
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
    </div>
  );
};
