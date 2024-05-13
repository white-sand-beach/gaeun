import axiosInstance from "../authentication/AxiosSet";

const CartAllDeleteService = async () => {
  const response = await axiosInstance.delete(
    `${import.meta.env.VITE_API_URL}/api/carts`);
  return response.data;
};

export default CartAllDeleteService;
