import axiosInstance from "../authentication/AxiosSet";

const CartGetService = async () => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/carts`);
  return response.data.data;
};

export default CartGetService;
