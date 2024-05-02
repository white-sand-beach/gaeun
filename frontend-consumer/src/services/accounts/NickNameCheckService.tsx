import axios from "axios";
import { useCookies } from "react-cookie";
import UserState from "../../types/UserState";

const UpdateProfileForm = async ({ nickName }: UserState): Promise<any> => {
  const [cookies] = useCookies(["accessToken"]);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const response = await axios.post(
    `${API_BASE_URL}/api/consumers/check-nickname`,
    { nickName },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    }
  );
  return response.data;
};

export default UpdateProfileForm;
