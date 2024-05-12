import axios from "axios";
import { PostSalesTypeAPI } from "../../types/sales/PostSalesTypeAPI";

const RegisterSalesAPI = () => {
    const postSales = ({storeId, sellPrice, content, menuId, stock, size}: PostSalesTypeAPI) => {
        axios.post(import.meta.env.VITE_BASE_URL + "/api/sales", {
            "storeId": storeId,
            "saleList": [
                {
                    "sellPrice": sellPrice,
                    "content": content,
                    "stock": stock,
                    "menuId": menuId,
                }
            ],
            "size": size,
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