import axios from "axios";
import Cookies from "universal-cookie";

const FavoriteGetForm = async ({ page, size }: {  page?: number, size?: number }): Promise<any> => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken")
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const response = await axios.get(
    `${API_BASE_URL}/api/favorites`, {
    params: {  page, size },
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export default FavoriteGetForm;
