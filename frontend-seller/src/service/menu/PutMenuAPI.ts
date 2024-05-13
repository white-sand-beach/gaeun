import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PutMenuAPIType } from "../../types/menu/PutMenuAPIType";
import Cookies from "universal-cookie";

const PutMenuAPI = () => {
  const cookies = new Cookies()
  const accessToken = cookies.get("accessToken")
  const navigate = useNavigate()
  const putMenu = ({menuId, image, name, originalPrice, sellPrice, storeId}: PutMenuAPIType) => {
    const formData = new FormData()
    if (image) {
      formData.append("image", image)
    }
    formData.append("name", name)
    formData.append("originalPrice", originalPrice.toString())
    formData.append("sellPrice", sellPrice.toString())
    formData.append("storeId", storeId!.toString())
    axios.put(import.meta.env.VITE_BASE_URL + `/api/menus/${menuId}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      console.log(res)
      window.alert("메뉴 수정 성공")
      navigate("/menus")
    })
    .catch(err => {
      console.error(err)
      window.alert("메뉴 수정 실패")
    })
  };
  return {
    putMenu
  };
};

export default PutMenuAPI;