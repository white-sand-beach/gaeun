import axiosInstance from "../authentication/AxiosSet";

const OrderDeleteForm = async (orderInfoId: string) => {
  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/orders/${orderInfoId}/status/consumer`);
  return response.data;
};

export default OrderDeleteForm;
