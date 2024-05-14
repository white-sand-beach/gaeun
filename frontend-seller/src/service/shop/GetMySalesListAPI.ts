import axios from "axios";
import Cookies from "universal-cookie";
import { SalesInfoType } from "../../types/shop/SalesInfoType";

const GetMySalesListAPI = () => {
    const cookies = new Cookies()
    const accessToken = cookies.get("accessToken")
    const storeId = 12
    const getSalesSeller = (setFunc:(saleList:SalesInfoType[]) => void) => {
        axios.get(import.meta.env.VITE_BASE_URL + "/api/sales/seller", {
            withCredentials: true,
            params: {
                "store-id": storeId,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log(res)
            setFunc(res.data.data.saleList)
        })
        .catch(err => {
            console.error(err);
        });
    };
    return {
        getSalesSeller,
    };
};

export default GetMySalesListAPI;