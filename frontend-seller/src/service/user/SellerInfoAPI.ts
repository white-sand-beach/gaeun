import axios from "axios";
import Cookies from "universal-cookie";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cookies = new Cookies()
const SellerInfoAPI = async (accessToken: string): Promise<string> => {
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/api/sellers", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response)
        cookies.set("storeId", response.data.data.storeId, { path: "/" })
        return response.data.storeId;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

export default SellerInfoAPI;