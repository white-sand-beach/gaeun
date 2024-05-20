import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterFoodType } from "../../types/foods/RegisterFoodType.ts";
import Cookies from "universal-cookie";

const RegisterFoodAPI = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const accessToken = cookies.get("accessToken")

  const postRegisterFood = ({ image, name, originalPrice, sellPrice, storeId }: RegisterFoodType) => {
    const formData = new FormData()
    formData.append("image", image ?? "")
    formData.append("name", name)
    formData.append("originalPrice", originalPrice.toString())
    formData.append("sellPrice", sellPrice.toString())
    formData.append("storeId", storeId.toString())
    axios.post(import.meta.env.VITE_BASE_URL + '/api/menus', formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        console.log(res)
        window.alert("메뉴 등록 성공")
        navigate("/menus")
      })
      .catch(err => {
        console.error(err)
      });
  };
  return {
    postRegisterFood,
  };
};

export default RegisterFoodAPI;