import axiosInstance from "../authentication/AxiosSet";

const OrderValidationForm = async (orderInfoId: string, paymentId: string): Promise<any> => {
  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/orders/${orderInfoId}/validation`,{
    paymentId
  }
);
  return response.data;
};

export default OrderValidationForm;
