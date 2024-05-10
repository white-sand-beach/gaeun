import axiosInstance from "../authentication/AxiosSet";

const CartPostService = async () => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/carts`);
  return response.data;
};

export default CartPostService;
