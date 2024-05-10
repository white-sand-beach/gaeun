import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFoodAPI = () => {
  const navigate = useNavigate()

  const postAddMenu = () => {
    axios.post(import.meta.env.VITE_BASE_URL + '/api/menus', {
      
    })
  }
}