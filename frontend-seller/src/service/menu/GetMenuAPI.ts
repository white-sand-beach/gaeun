import axios from "axios";
import { MenuInfoType } from "../../types/menu/MenuInfoType";
import Cookies from "universal-cookie";

const GetMenuAPI = () => {
  const cookies = new Cookies()
  const accessToken = cookies.get("accessToken")
  const storeId = 1;
  const getMenu = (setMenuInfo:(menus: MenuInfoType[]) => void) => {
    axios.get(import.meta.env.VITE_BASE_URL + '/api/menus', {
      params: {
        "store-id": storeId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      console.log(res)
      setMenuInfo(res.data.data.menus)
    })
    .catch(err => {
      console.error(err)
    });
  };

  return {
    getMenu,
  };
};

export default GetMenuAPI;