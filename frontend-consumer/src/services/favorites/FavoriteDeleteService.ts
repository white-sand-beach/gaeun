import axios from "axios";
import Cookies from "universal-cookie";

const FavoriteDeleteForm = async ({ favoriteId }) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken")
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  const response = await axios.delete(
    `${API_BASE_URL}/api/favorites`,
    { favoriteId },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export default FavoriteDeleteForm;
