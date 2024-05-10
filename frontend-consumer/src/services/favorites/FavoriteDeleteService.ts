import axiosInstance from "../authentication/AxiosSet";

const FavoriteDeleteForm = async ({ favoriteId }: { favoriteId: number }): Promise<any> => {

  const response = await axiosInstance.delete(
    `${import.meta.env.VITE_API_URL}/api/favorites/${favoriteId}`);
  return response.data;
};

export default FavoriteDeleteForm;
