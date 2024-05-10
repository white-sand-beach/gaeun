import axiosInstance from "../authentication/AxiosSet";
import UserState from "../../types/UserState";

const NicknameCheckForm = async ({ nickname }: UserState): Promise<UserState> => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/consumers/check-nickname`,
    { nickname },
  );
  return response.data;
};

export default NicknameCheckForm;
