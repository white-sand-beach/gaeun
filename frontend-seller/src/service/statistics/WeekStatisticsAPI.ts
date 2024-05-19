import axios from "axios";
import Cookies from "universal-cookie";
import { SaleStatisticList } from "../../types/statistics/SaleStatisticList";


const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const storeId = cookies.get("storeId")
const WeekStatisticsAPI = async (): Promise<SaleStatisticList> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + `/api/statistics/${storeId}/registration/week`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("주간 판매량 조회 성공")
    console.log(response.data.data)
    return response.data.data;
  }
  catch (err) {
    console.log("주간 판매랑 조회 실패")
    console.error(err)
    throw err;
  }
};

export default WeekStatisticsAPI;