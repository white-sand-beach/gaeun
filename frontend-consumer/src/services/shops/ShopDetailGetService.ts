import axiosInstance from "../authentication/AxiosSet";
import { ShopDetail } from "../../types/ShopDetailType";

const ShopDetailGetForm = async ({
  Id,
}: {
  Id?: string;
}): Promise<ShopDetail> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/stores/${Id}/detail`
  );
  return response.data.data;
};

export default ShopDetailGetForm;
