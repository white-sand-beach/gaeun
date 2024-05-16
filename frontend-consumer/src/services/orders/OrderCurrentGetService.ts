import axiosInstance from "../authentication/AxiosSet";
import { OrderCurrentState } from "../../types/OrderType";

const OrderCurrentGetForm = async (orderInfoId: string): Promise<OrderCurrentState> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/orders/${orderInfoId}/in-progress`);
  return response.data.data;
};

export default OrderCurrentGetForm;
