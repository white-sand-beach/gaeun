import axiosInstance from "../authentication/AxiosSet";

interface OrderReturn {
  page: string,
  size: string,
  keyword: string,
}

const OrderGetForm = async ({ page, size, keyword }: OrderReturn): Promise<any> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/orders`, {
      params: { page, size, keyword },
    });
  return response.data.data;
};

export default OrderGetForm;
