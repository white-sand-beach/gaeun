import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddMenuType } from "../../types/foods/AddMenuType";
import Cookies from "universal-cookie";

const AddFoodAPI = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const accessToken = cookies.get("accessToken")

  const postRegisterMenu = ({image, name, originalPrice, sellPrice, storeId}: AddMenuType) => {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("name", name)
    formData.append("originalPrice", originalPrice.toString())
    formData.append("sellPrice", sellPrice.toString())
    formData.append("storeId", storeId.toString())
    axios.post(import.meta.env.VITE_BASE_URL + '/api/menus', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      console.log(res)
      window.alert("메뉴 등록 성공")
      navigate("/")
    })
    .catch(err => {
      console.error(err)
    });
  };
  return {
    postRegisterMenu,
  };
};

export default AddFoodAPI;