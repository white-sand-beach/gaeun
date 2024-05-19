import axiosInstance from "../authentication/AxiosSet";

const ShopReveiwGetForm = async ({
  page,
  size,
  storeId,
}: {
  page: number;
  size: number;
  storeId?: string;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/reviews/consumer`,
    {
      params: { page: page, size: size, "store-id": storeId },
    }
  );
  return response.data;
};

export default ShopReveiwGetForm;
