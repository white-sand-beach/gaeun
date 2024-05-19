import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const storeId = cookies.get("storeId")
const FinishOrderList = async (page: number, size: number): Promise<any> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/api/orders/finished", {
      params: {
        "store-id": storeId,
        "page": page.toString(),
        "size": size.toString(),
        "order-no": "",
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response
  }
  catch (err) {
    console.error(err)
    throw err
  }
};

export default FinishOrderList;