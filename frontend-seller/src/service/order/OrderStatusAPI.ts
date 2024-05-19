import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");
const OrderStatusAPI = async (orderInfoId: number, status: string, takenTime?: number): Promise<any> => {
  try {
    const requestBody: { status: string, takenTime?: number } = { status };

    // 요청하는 상태가 진행 중인 경우에만 takenTime을 넣어서 보낸다
    if (status === "IN_PROGRESS" && takenTime !== undefined) {
      requestBody.takenTime = takenTime
    }

    const response = await axios.put(import.meta.env.VITE_BASE_URL + `/api/orders/${orderInfoId}/status/seller`, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response);
    return response;
  }
  catch (err) {
    console.error(err);
  }
};

export default OrderStatusAPI;