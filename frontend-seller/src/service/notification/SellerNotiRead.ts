import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");
const SellerNotiRead = async (sellerNotiId: number): Promise<any> => {
  try {
    const response = await axios.post(import.meta.env.VITE_BASE_URL + `/api/seller-notifications/is-read-true/${sellerNotiId}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log("알람 읽었어요: ", response)
    return response
  }
  catch (err) {
    console.error("알람 못 읽었어요", err)
  }
};

export default SellerNotiRead;