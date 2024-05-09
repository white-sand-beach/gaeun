import axios from "axios";
import Cookies from "universal-cookie";
import UserState from "@/types/UserState";

const NicknameCheckForm = async ({ nickname }: UserState): Promise<UserState> => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken")
  
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/consumers/check-nickname`,
    { nickname },
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

export default NicknameCheckForm;
