import axiosInstance from "../authentication/AxiosSet";

const NotificationsCountForm = async (): Promise<number> => {

  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/consumer-notifications/count`);
  return response.data;
};

export default NotificationsCountForm;
