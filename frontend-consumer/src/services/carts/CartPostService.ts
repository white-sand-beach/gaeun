import axiosInstance from "../authentication/AxiosSet";

interface CartData {
  quantity: number;
  storeId: number;
  saleId: number;
}

const CartPostService = async ({ quantity, storeId, saleId }: CartData): Promise<CartData> => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/carts`, {
    quantity,
    storeId,
    saleId,
  });
  return response.data;
};

export default CartPostService;
