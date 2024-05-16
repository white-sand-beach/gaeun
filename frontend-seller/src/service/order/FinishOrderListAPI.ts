import axios from "axios";
import Cookies from "universal-cookie";
import { FinishOrderType } from "../../types/order/FinishOrderType";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const FinishOrderListAPI = async (page: string, size: number): Promise<FinishOrderType> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/api/orders/finished", {
      params: {
        "store-id": 11,
        "page": page,
        "size": size,
        "oreder-no": ""
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  }
  catch (err) {
    console.error(err)
    throw err
  }
};

export default FinishOrderListAPI;