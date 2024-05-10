import axiosInstance from "../authentication/AxiosSet";
import UserState from "../../types/UserState";

const UpdateProfileForm = async ({
  nickname,
  profileImage,
  phoneNumber,
}: UserState): Promise<UserState> => {

  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/consumers`,
    { nickname, phoneNumber }
  );
  console.log(profileImage)
  return response.data;
};

export default UpdateProfileForm;