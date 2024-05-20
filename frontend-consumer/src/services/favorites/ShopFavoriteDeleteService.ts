import axiosInstance from "../authentication/AxiosSet";

const ShoptFavoriteDeleteForm = async ({
  storeId,
}: {
  storeId: number;
}): Promise<any> => {
  const response = await axiosInstance.delete(
    `${import.meta.env.VITE_API_URL}/api/favorites`,
    { data: { storeId } } // request body에 데이터를 추가하여 DELETE 요청 보내기
  );
  return response.data;
};

export default ShoptFavoriteDeleteForm;
