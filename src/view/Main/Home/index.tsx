import { CarIcon, WrenchIcon, FilePenLine } from "lucide-react";
export const HomeUI = () => {


    const itemsMenu = [
      {
        label: "Mis vehiculos",
        key: "vehiculos",
        icon: <CarIcon className="w-24 h-24 text-desert-sand" />,
      },
      {
        label: "Mis mantenimientos",
        key: "mantenimientos",
        icon: <FilePenLine className="w-24 h-24 text-desert-sand" />,
      },
      {
        label: "Talleres",
        key: "talleres",
        icon: <WrenchIcon className="w-24 h-24 text-desert-sand" />,
      },
    ];



    return (
        <div className="w-full min-h-full h-full flex justify-center items-center p-2">
            <div className="grid grid-cols-2 gap-2">
                {itemsMenu.map((item) => (
                    <div key={item.key} className="flex flex-col items-center gap-2 border-2 border-desert-sand rounded-md p-2 hover:cursor-pointer hover:bg-desert-sand/10 hover:text-carbon-black transition-all duration-300">
                        <div>
                            {item.icon}
                        </div>
                        <div className="text-orange-rally">{item.label}</div>
                    </div>
                ))  }
            </div>
        </div>
    )
}