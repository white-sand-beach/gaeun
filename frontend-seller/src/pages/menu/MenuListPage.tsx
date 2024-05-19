import { useEffect, useState } from "react";
import MenuList from "../../components/menu/MenuList";
import { MenuInfoType } from "../../types/menu/MenuInfoType";
import GetMenuAPI from "../../service/menu/GetMenuAPI";

const MenuListPage = () => {
  const [menusInfo, setMenusInfo] = useState<MenuInfoType[]>([])
  
  const { getMenu } = GetMenuAPI();
  const handleGetMenu = () => {
    getMenu(setMenusInfo)
  }

  useEffect(() => {
    handleGetMenu()
  }, [])

  return (
    <div className="yes-footer top-[75px] overflow-y-scroll">
      <MenuList 
      menusInfo={menusInfo}
      />
    </div>
  );
};

export default MenuListPage;