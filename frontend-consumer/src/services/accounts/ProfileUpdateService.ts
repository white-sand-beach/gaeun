import axiosInstance from "../authentication/AxiosSet";
import UserState from "../../types/UserState";

const UpdateProfileForm = async ({
  nickname,
  profileImage,
  imageUrl,
  phoneNumber,
}: UserState): Promise<UserState> => {
  const formData = new FormData();

  formData.append("nickname", String(nickname));
  formData.append("phoneNumber", String(phoneNumber));
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }
  if (imageUrl) {
    formData.append("imageUrl", imageUrl);
  }
  
  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/consumers`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export default UpdateProfileForm;