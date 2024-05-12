import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const DeleteMenuAPI = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const accessToken = cookies.get("accessToken")
  const DeleteMenu = (menuId:any) => {
    axios.delete(import.meta.env.VITE_BASE_URL + `/api/menus/${menuId}`, {
      params: {
        "storeId": 37
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      console.log(res)
      window.alert("메뉴 삭제 성공")
      navigate("/menus")
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