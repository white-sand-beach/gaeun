import { useEffect, useState } from "react";
import MenuList from "../../components/menu/MenuList";
import { MenuInfoType } from "../../types/menu/MenuInfoType";
import GetMenuAPI from "../../service/menu/GetMenuAPI";

const MenuListPage = () => {
  const [menusInfo, setMenusInfo] = useState<MenuInfoType[]>([]);

  const { getMenu } = GetMenuAPI();
  const handleGetMenu = () => {
    getMenu(setMenusInfo);
  };

  useEffect(() => {
    handleGetMenu();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <MenuList menusInfo={menusInfo} />
    </div>
  );
};

export default MenuListPage;
