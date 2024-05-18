import axiosInstance from "../authentication/AxiosSet";

interface NotificationData {
  page: string,
  size: string,
}

const NotificationGetForm = async ({ page, size }: NotificationData): Promise<any> => {

  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/consumer-notifications`, {
    params: { page, size },
  });
  return response.data;
};

export default NotificationGetForm;
