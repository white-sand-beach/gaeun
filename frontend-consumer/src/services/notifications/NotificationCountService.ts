import axiosInstance from "../authentication/AxiosSet";

interface count {
  count: number
}

const NotificationCountForm = async (): Promise<count> => {

  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/consumer-notifications/count`);
    console.log(response.data.data.count)
  return response.data.data;
};

export default NotificationCountForm;
