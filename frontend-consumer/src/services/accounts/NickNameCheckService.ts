import axios from "axios";
import Cookies from "universal-cookie";
import UserState from "@/types/UserState";

const NickNameCheckForm = async ({ nickName }: UserState): Promise<any> => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken")
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  const response = await axios.post(
    `${API_BASE_URL}/api/consumers/check-nickname`,
    { nickName },
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

export default NickNameCheckForm;
