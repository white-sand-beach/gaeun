import ShopMenuGetForm from "../../services/shops/ShopMenuGetService";
import { MenuItem, ShopMenuType } from "../../types/ShopMenuType";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShopMenu = () => {
  const { Id } = useParams();
  const [allMenu, setAllmenu] = useState<ShopMenuType>({
    storeId: 0,
    saleList: [],
    size: 0,
  });
  const [shopMenu, setShopmenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(Id);
      try {
        const response = await ShopMenuGetForm({ Id });
        setAllmenu(response);
        setShopmenu(response.saleList);
      } catch (error) {
        console.error("우가우가우가");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(shopMenu);
    console.log(allMenu);
  }, [shopMenu, allMenu]);

  return (
    <div>
      {allMenu.saleList.map((menu) => (
        <Menu key={menu.saleId} menu={menu} />
      ))}
    </div>
  );
};

export default ShopMenu;
