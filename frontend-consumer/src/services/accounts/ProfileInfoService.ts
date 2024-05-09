import axios from "axios";
import Cookies from "universal-cookie";

const ProfileForm = async (): Promise<any> => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/consumers`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.data
};

export default ProfileForm;