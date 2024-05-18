import axios from "axios";
import { UpdateSales } from "../../types/sales/UpdateSales.ts"
import Cookies from "universal-cookie";

const UpdateSalesAPI = () => {
    const cookies = new Cookies()
    const accessToken = cookies.get("accessToken")
    const storeId = 1;
    const putSales = ({saleId, menuId, content, isFinished, stock}: UpdateSales) => {
        axios.put(import.meta.env.VITE_BASE_URL + `/api/sales/${String(saleId)}`, {
            storeId,
            menuId,
            content,
            isFinished,
            stock,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log(res)
            console.log("판매 수정 성공")
        })
        .catch(err => {
            console.error(err)
            console.log("판매 수정 실패")
        });
    }
    return {
        putSales,
    };
};

export default UpdateSalesAPI;