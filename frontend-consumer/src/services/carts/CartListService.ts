import axiosInstance from "../authentication/AxiosSet";

const CartListService = async () => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/carts`);
  return response.data;
};

export default CartListService;
