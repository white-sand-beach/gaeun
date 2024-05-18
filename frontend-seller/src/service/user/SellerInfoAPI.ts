import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SellerInfoAPI = async (): Promise<any> => {
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/api/sellers", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data.storeId;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

export default SellerInfoAPI;