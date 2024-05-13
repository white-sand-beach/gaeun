import axiosInstance from "../authentication/AxiosSet";

const ShoptFavoritePostForm = async ({ Id }: { Id?: number }): Promise<any> => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/favorites`,
    { Id }
  );
  return response.data;
};

export default ShoptFavoritePostForm;
