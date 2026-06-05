import { IconCarSuv, IconMotorcycle } from "@/assets/svg";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "tomascomponents";
import { Button, Space } from "antd";
import type { IHeaderUIHook } from "./HeaderUI.hook";
import { MenuIcon } from "lucide-react";

export const HeaderView = ({ userOptions, userName, toggleOpen }: IHeaderUIHook) => {
    return (
      <div className="bg-blue-bodywork flex justify-between items-center p-2">
        <div className="flex items-center gap-2">
          <div className=" pl-2">
            <Button onClick={toggleOpen} variant="text" type="text">
              <div className="flex flex-row items-center justify-between gap-2 text-orange-rally">
                <MenuIcon className="w-4 h-4" />
              </div>
            </Button>
          </div>
          <div className="items-center gap-2 pl-2 hidden md:flex">
            <span className="font-bold text-orange-rally">MotCarApp</span>
            <div className="flex flex-row items-center gap-2">
              <IconCarSuv className="w-10 h-10 text-desert-sand" transform="scale(-1, 1)" />
              <IconMotorcycle className="w-7 h-7 text-desert-sand" />
            </div>
          </div>
        </div>
        <div className="pr-2">
          <Dropdown menu={{ items: userOptions }} placement="bottomRight" trigger={["click"]}>
            <Button variant="outlined" type="primary">
              <Space>
                {userName}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
    );
}