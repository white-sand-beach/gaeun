import axiosInstance from "../authentication/AxiosSet";

interface CartAmountProps {
  quantity: number;
  cartId: string;
}

const CartAmountService = async ({ quantity, cartId }: CartAmountProps) => {
  const response = await axiosInstance.put(
    `${import.meta.env.VITE_API_URL}/api/carts/${cartId}`, 
  {
    quantity: quantity
  });
  return response.data;
};

export default CartAmountService;
