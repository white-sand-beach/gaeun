import axiosInstance from "../authentication/AxiosSet";

const OrderGetForm = async (): Promise<any> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/orders`);
  return response.data;
};

export default OrderGetForm;
