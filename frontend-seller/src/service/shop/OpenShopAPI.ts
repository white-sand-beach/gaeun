import axios from "axios";
import Cookies from "universal-cookie";

const OpenShopAPI = () => {
    const cookies = new Cookies()
    const accessToken = cookies.get("accessToken")
    const storeId = 29
    const putFinishAll = () => {
        axios.put(import.meta.env.VITE_BASE_URL + "/api/sales/finish-all", {
            "storeId": storeId
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        .then(res => {
            console.log(res);
            console.log("전체 판매 종료 성공");
        })
        .catch(err => {
            console.error(err);
            console.log("전체 판매 종료 실패");
        });
    };
    return {
        putFinishAll,
    };
};

export default OpenShopAPI;