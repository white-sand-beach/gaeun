import axios from "axios";
import Cookies from "universal-cookie";

const InprogressOrder = () => {
    const cookies = new Cookies()
    const accessToken = cookies.get("accessToken")
    const storeId = 11;
    const getOrderInprogress = () => {
        axios.get(import.meta.env.VITE_BASE_URL + "/api/orders/in-progress", {
            params: {
                "store-id": storeId
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log(res)
            console.log("진행중 주문목록 조회 성공")
        })
        .catch(err => {
            console.error(err)
            console.log("진행중 주문목록 조회 실패")
        });
    };
    return {
        getOrderInprogress,
    };
};

export default InprogressOrder;