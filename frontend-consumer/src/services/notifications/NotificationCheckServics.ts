import axiosInstance from "../authentication/AxiosSet";

const NotificationCheckForm = async (consumerNotificationId: string): Promise<number> => {

  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/consumer-notifications/is-read-true/${consumerNotificationId}`);
  return response.data;
};

export default NotificationCheckForm;
