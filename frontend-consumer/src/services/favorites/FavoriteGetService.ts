import axiosInstance from "../authentication/AxiosSet";

const FavoriteGetForm = async ({ page, size }: {  page?: number, size?: number }): Promise<any> => {

  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/favorites`, {
    params: { page, size },
  });
  return response.data;
};

export default FavoriteGetForm;
