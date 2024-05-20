import axios from "axios";
import Cookies from "universal-cookie";
import { DetailOrderInfoType } from "../../types/order/DetailOrderInfoType";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const DetailOrderInfo = async (ordefInfoId: string): Promise<DetailOrderInfoType> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + `/api/orders/${ordefInfoId}/seller`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data.data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export default DetailOrderInfo;