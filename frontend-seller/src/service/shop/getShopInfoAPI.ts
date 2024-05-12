import axios from "axios";
import Cookies from "universal-cookie";

const getShopInfoAPI = () => {
    const cookies = new Cookies()
    const accessToken = cookies.get("accessToken")
    const storeId = 37
    const getShopInfo = (setShopInfo: any) => {
        axios.get(import.meta.env.VITE_BASE_URL + `/api/stores/${storeId}`, {
            params: {
                "store-id": 37
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