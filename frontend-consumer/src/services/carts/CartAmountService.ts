import axiosInstance from "../authentication/AxiosSet";

const CartAmountService = async () => {
  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/carts/cartId/amount`);
  return response.data;
};

export default CartAmountService;
