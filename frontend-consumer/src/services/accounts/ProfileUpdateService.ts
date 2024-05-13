import axiosInstance from "../authentication/AxiosSet";
import UserState from "../../types/UserState";

const UpdateProfileForm = async ({
  nickname,
  profileImage,
  phoneNumber,
}: UserState): Promise<UserState> => {
  const formData = new FormData();

  formData.append("nickname", String(nickname));
  formData.append("phoneNumber", String(phoneNumber));
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }
  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/consumers`,
    formData,
  );
  console.log(profileImage)
  return response.data;
};

export default UpdateProfileForm;