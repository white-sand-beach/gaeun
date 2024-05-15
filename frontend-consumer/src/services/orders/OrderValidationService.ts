import axiosInstance from "../authentication/AxiosSet";

const OrderValidationService = async (orderInfoId: string, paymentId: string): Promise<any> => {
  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/orders/${orderInfoId}/validation`,{
    params: {
      paymentId
    }
  }
);
  return response.data;
};

export default OrderValidationService;
