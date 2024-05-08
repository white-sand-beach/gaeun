import axios from "axios";
import Cookies from "universal-cookie";
import UserState from "../../types/UserState";

const ProfileForm = async (): Promise<UserState> => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/consumers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    throw error; // 이를 다시 던져 컴포넌트에서 catch 할 수 있도록 함
  }
};

export default ProfileForm;
