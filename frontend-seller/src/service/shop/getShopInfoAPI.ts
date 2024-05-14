import axios from "axios";
import Cookies from "universal-cookie";

const getShopInfoAPI = () => {
    const cookies = new Cookies()
    const accessToken = cookies.get("accessToken")
    const storeId = cookies.get("storeId")
    const getShopInfo = (setShopInfo: any) => {
        axios.get(import.meta.env.VITE_BASE_URL + `/api/stores/${storeId}`, {
            withCredentials: true,
            params: {
                "store-id": storeId
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            console.log(res)
            setShopInfo(res.data.data)
        })
        .catch((err) => {
            console.error(err)
        });
    };
    return {
        getShopInfo,
    };
};

export default getShopInfoAPI;