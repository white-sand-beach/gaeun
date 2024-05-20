import axiosInstance from "../authentication/AxiosSet";

const CartDeleteService = async (cartId: string) => {
  const response = await axiosInstance.delete(
    `${import.meta.env.VITE_API_URL}/api/carts/${cartId}`);
  return response.data;
};

export default CartDeleteService;
