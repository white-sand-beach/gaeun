import axios from "axios";
import Cookies from "universal-cookie";
import { SaleStatisticList } from "../../types/statistics/SaleStatisticList";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const storeId = 1;
const MonthStatisticAPI = async (): Promise<SaleStatisticList> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + `/api/statistics/${storeId}/registration/month`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("월간 판매량 조회 성공");
    console.log(response);
    return response.data.data;
  }
  catch (err) {
    console.log("월간 판매량 조회 실패");
    console.error(err);
    throw err;
  }
};

export default MonthStatisticAPI;