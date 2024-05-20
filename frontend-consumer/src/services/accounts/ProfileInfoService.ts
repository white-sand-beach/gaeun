import axiosInstance from "../authentication/AxiosSet";

const ProfileForm = async (): Promise<any> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/consumers`);
  return response.data.data
};

export default ProfileForm;
