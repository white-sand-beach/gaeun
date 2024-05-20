import axiosInstance from "../authentication/AxiosSet";
import { ShopMenuType } from "../../types/ShopMenuType";

const ShopMenuGetForm = async ({
  Id,
}: {
  Id?: string;
}): Promise<ShopMenuType> => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/sales/consumer`,
    {
      params: {
        "store-id": Id,
      },
    }
  );
  return response.data.data;
};

export default ShopMenuGetForm;
