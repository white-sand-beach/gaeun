import axios from "axios";
import Cookies from "universal-cookie";

const OpenShopAPI = () => {
    const cookies = new Cookies()
    const accessToken = cookies.get("accessToken")
    const storeId = cookies.get("storeId")
    const putShopOpened = () => {
        axios.put(import.meta.env.VITE_BASE_URL + `/api/stores/${storeId}/is-opened`, {}, {
            params: {
                "store-id": storeId
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log(res);
            console.log("가게 영업 여부 수정 성공");
        })
        .catch(err => {
            console.error(err);
            console.log("가게 영업 여부 수정 실패");
        });
    };
    return {
        putShopOpened,
    };
};

export default OpenShopAPI;