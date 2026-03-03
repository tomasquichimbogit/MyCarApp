import { Button } from "antd";
import type { IHeaderUI } from "./HeaderUI.hook";
import { MenuIcon } from "lucide-react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

export const HeaderUIView = ({ toggleOpen, userOptions, userName }: IHeaderUI) => {
  
  return (
    <header className="flex flex-row items-center justify-between h-[64px] sticky top-0 z-1000 w-full border-b border-gray-200">
      <div className=" pl-2">
        <Button
          onClick={toggleOpen}
          variant="text"
        >
           <div className="flex flex-row items-center justify-between gap-2">
              <MenuIcon className="w-4 h-4" /> MyCarApp
            </div>
        </Button>
      </div>
      <div className="flex flex-row items-center justify-end pr-2 w-1/2">
        <Dropdown menu={{ items: userOptions }} placement="bottomLeft" trigger={['click']}>
          <Button variant="outlined">
            <Space>
              {userName}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown> 
      </div>
    </header>
  );
};
