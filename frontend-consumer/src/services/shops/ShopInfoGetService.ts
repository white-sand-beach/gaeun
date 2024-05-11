import axiosInstance from "../authentication/AxiosSet";
import { ShopInfo } from "../../types/ShopInfoType";

const ShopInfoGetForm = async ({ Id }: { Id?: string }): Promise<ShopInfo> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/stores/${Id}/info`,
    {}
  );
  return response.data.data;
};

export default ShopInfoGetForm;
