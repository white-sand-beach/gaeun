import axiosInstance from "../authentication/AxiosSet";

const LogoutService = async () => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/consumers/logout`);
  return response.data;
};

export default LogoutService;
