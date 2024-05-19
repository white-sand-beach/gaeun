import axiosInstance from "../authentication/AxiosSet";

interface CartData {
  quantity: number;
  storeId: number;
  saleId: number;
}

const CartPostService = async ({ quantity, storeId, saleId }: CartData): Promise<CartData | { status: number }> => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/api/carts`, {
        quantity,
        storeId,
        saleId,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && (error.response.status === 409 || error.response.status === 400)) {
      return { status: error.response.status };
    }
    throw error; // 다른 에러는 글로벌 에러 핸들링을 위해 다시 던짐
  }
};

export default CartPostService;
