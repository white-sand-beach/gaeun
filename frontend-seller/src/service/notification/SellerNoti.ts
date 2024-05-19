import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken")
const SellerNoti = async (page: number, size: number): Promise<Notification> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/api/seller-notifications", {
      params: {
        "page": page,
        "size": size,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log("리뷰 조회 성공: ", response);
    return response.data;
  }
  catch (err) {
    console.error("리뷰 조회 실패: ", err);
    throw err;
  }
};

export default SellerNoti;