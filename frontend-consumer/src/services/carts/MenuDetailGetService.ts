import axiosInstance from "../authentication/AxiosSet";

const MenuDetailGetService = async ({ saleId }: { saleId: string })=> {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/sales/${saleId}/consumer`);
  return response.data.data;
};

export default MenuDetailGetService;
