import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PutMenuAPIType } from "../../types/menu/PutMenuAPIType";

const PutMenuAPI = () => {
  const navigate = useNavigate()
  const putMenu = ({menuId, image, name, originalPrice, sellPrice, storeId}: PutMenuAPIType) => {
    const formData = new FormData()
    if (image) {
      formData.append("image", image)
    }
    formData.append("name", name)
    formData.append("originalPrice", originalPrice.toString())
    formData.append("sellPrice", sellPrice.toString())
    formData.append("storeId", storeId.toString())
    axios.put(import.meta.env.VITE_BASE_URL + `/api/menus/${menuId}`, formData)
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