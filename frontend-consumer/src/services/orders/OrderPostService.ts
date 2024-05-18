import axiosInstance from "../authentication/AxiosSet";

const OrderPostForm = async (): Promise<any> => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/orders`);
  return response.data.data;
};

export default OrderPostForm;
