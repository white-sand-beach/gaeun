import axios from "axios";
import Cookies from "universal-cookie";

const DeleteMenuAPI = () => {
  const cookies = new Cookies()
  const accessToken = cookies.get("accessToken")
  const DeleteMenu = (menuId:any) => {
    axios.delete(import.meta.env.VITE_BASE_URL + `/api/menus/${menuId}`, {
      withCredentials: true,
      params: {
        "menu-id": menuId
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        "storeId": 11,
      }
    },)
    .then(res => {
      console.log(res)
      window.alert("메뉴 삭제 성공")
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
      window.alert("메뉴 삭제 실패")
    })
  };
  return {
    DeleteMenu
  };
};

export default DeleteMenuAPI;