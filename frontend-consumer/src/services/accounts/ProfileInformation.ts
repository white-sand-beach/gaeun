import axiosInstance from "../authentication/AxiosSet";
import UserState from "../../types/UserState";

const ProfileForm = async (): Promise<UserState> => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/api/consumers/profile`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    throw error; // 이를 다시 던져 컴포넌트에서 catch 할 수 있도록 함
  }
};

export default ProfileForm;
