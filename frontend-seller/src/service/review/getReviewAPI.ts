import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");
const storeId = cookies.get("storeId");
const getReviewAPI = async (page: number, size: number): Promise<any> => {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "/api/reviews/seller", {
      params: {
        "page": page,
        "size": size,
        "store-id": storeId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log("리뷰 조회 성공: ", response)
    return response
  }
  catch (err) {
    console.error(err)
    throw err
  }
};

export default getReviewAPI;