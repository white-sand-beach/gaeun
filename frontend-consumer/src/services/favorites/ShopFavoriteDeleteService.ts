import axiosInstance from "../authentication/AxiosSet";

const ShopFavoriteDeleteForm = async ({
  Id,
}: {
  Id?: string;
}): Promise<any> => {
  const response = await axiosInstance.delete(
    `${import.meta.env.VITE_API_URL}/api/favorites/${Id}`
  );
  return response.data;
};

export default ShopFavoriteDeleteForm;
