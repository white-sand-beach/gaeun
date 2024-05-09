import axios from "axios";
import Cookies from "universal-cookie";

const FavoritePostForm = async ({ storeId }: { storeId: number }): Promise<any> => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken")

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/favorites`,
    { storeId },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  return response.data;
};

export default FavoritePostForm;
