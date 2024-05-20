import axios from "axios";
import { PostSalesTypeAPI } from "../../types/sales/PostSalesTypeAPI";
import Cookies from "universal-cookie";

const RegisterSalesAPI = () => {
    const cookies = new Cookies()
    const accessToken = cookies.get("accessToken")
    const postSales = ({ storeId, saleList }: PostSalesTypeAPI) => {
        axios.post(import.meta.env.VITE_BASE_URL + "/api/sales", {
            storeId,
            saleList,
        }, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                console.log(res)
                window.alert("판매 등록 성공")
            })
            .catch(err => {
                console.error(err)
                window.alert("판매 등록 실패")
            });
    };
    return {
        postSales,
    };
};

export default RegisterSalesAPI;