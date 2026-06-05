import type { ReactNode } from "react";
import fondoLogin from "@/assets/images/fondo-login-5.png";
import { IconCarSuv, IconMotorcycle } from "@/assets/svg";

interface SecurityAuthLayoutProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const features = ["Gestión de Vehículos", "Mantenimientos", "Talleres"];

export const SecurityAuthLayout = ({ title, icon, children }: SecurityAuthLayoutProps) => {
  return (
    <div className="grid h-screen w-screen grid-rows-[35vh_1fr] md:grid-rows-1 md:grid-cols-2 bg-blue-bodywork">
      <div
        className="order-1 md:order-2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondoLogin})` }}
      />
      <div className="order-2 md:order-1 flex flex-col items-center rounded-t-4xl md:rounded-none md:mt-0 relative z-10">
        <div className="flex justify-center w-full pt-2 pr-2">
          <div className="flex items-center gap-2 pl-2">
            <span className="font-bold text-orange-rally">MotCarApp</span>
            <IconCarSuv className="w-10 h-10 text-desert-sand" transform="scale(-1, 1)" />
            <IconMotorcycle className="w-7 h-7 text-desert-sand" />
          </div>
        </div>

        <div className="flex flex-col min-h-0 flex-1 h-full w-full justify-center items-center">
          <div className="flex flex-col gap-4 w-full max-w-md md:border border-orange-rally/20 rounded-2xl p-2">
            <div className="flex items-center justify-center rounded-full text-orange-rally">{icon}</div>
            <div className="text-2xl font-bold text-center text-orange-rally">{title}</div>
            {children}
          </div>
        </div>

          <div className="p-0.5">
          <div className="flex flex-row gap-2 items-center justify-center text-desert-sand bg-gray-100/10 p-2 rounded-2xl">
            {features.map((feature, index) => (
              <span key={feature} className="flex gap-2">
                <small>{feature}</small>
                {index < features.length - 1 && <small>-</small>}
              </span>
            ))}
          </div>
          </div>
      </div>
    </div>
  );
};
