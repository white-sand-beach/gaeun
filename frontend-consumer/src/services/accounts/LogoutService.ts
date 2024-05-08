import axios from "axios";
import Cookies from "universal-cookie";

const LogoutService = async () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken")
  
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/consumers/logout`,
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

export default LogoutService;
