import axiosInstance from "../authentication/AxiosSet";

const OrderDetailGetForm = async (orderInfoId: string): Promise<any> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/orders/${orderInfoId}/consumer`);
  return response.data.data;
};

export default OrderDetailGetForm;
