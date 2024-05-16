import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const DetailOrderInfo = (ordefInfoId: string) => {
  axios.get(import.meta.env.VITE_BASE_URL + `/api/orders/${ordefInfoId}/seller`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
};

export default DetailOrderInfo;