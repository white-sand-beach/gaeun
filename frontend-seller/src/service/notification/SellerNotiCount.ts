import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const SellerNotiCount = async (): Promise<any> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/api/seller-notifications/count", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log("읽지 않은 알림 조회 성공", response)
    return response
  }
  catch (err) {
    console.error("읽지 않은 알림 조회 실패", err)
  }
};

export default SellerNotiCount;