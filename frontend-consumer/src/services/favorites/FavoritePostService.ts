import axiosInstance from "../authentication/AxiosSet";

const FavoritePostForm = async ({
  storeId,
}: {
  storeId: number;
}): Promise<any> => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/favorites`,
    { storeId }
  );
  return response.data;
};

export default FavoritePostForm;
