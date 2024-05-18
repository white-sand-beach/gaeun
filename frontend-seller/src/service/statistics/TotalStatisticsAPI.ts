import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const storeId = 4

const TotalStatisticsAPI = async ():Promise<any> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + `/api/statistics/${storeId}/receipt/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("총 판매량 조회 성공")
    console.log(response)
    return response
  }
  catch (err) {
    console.log("총 판매량 조회 실패")
    console.error(err)
    throw err
  };
};

export default TotalStatisticsAPI;