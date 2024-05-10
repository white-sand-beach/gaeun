import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputRegisterShop } from "../../types/shop/InputRegisterShop";
import Cookies from "universal-cookie";

const RegisterShopAPI = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    // 쿠키에서 토큰 가져오기
    const accessToken = cookies.get("accessToken");

    // 가게 등록 api
    const postRegisterShop = ({
        shopImage,
        shopName,
        shopOwner,
        shopNumber,
        shopzibunAddr,
        shoproadAddr,
        shopLat,
        shopLon,
        shopIntro,
        shopWorkday,
        shopHoliday,
        FoodOrigin,
        shopCategoryId,
    }: InputRegisterShop) => {
        const formData = new FormData();
        formData.append("registeredName", shopName);
        formData.append("bossName", shopOwner);
        formData.append("address", shopzibunAddr);
        formData.append("roadAddress", shoproadAddr);
        formData.append("latitude", shopLat.toString());
        formData.append("longitude", shopLon.toString());
        formData.append("tel", shopNumber,);
        formData.append("name", shopName,);
        formData.append("image", shopImage ?? "");
        formData.append("operatingTime", shopWorkday ?? "");
        formData.append("holiday", shopHoliday ?? "");
        formData.append("originCountry", FoodOrigin ?? "");
        formData.append("introduction", shopIntro ?? "");
        formData.append("categoryIdList", shopCategoryId.toString());
        axios.post(import.meta.env.VITE_BASE_URL + "/api/stores", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log(res.data)
            window.alert("가게 등록 성공 ㅎㅎ")
            cookies.set("storeId", res.data.data.storeId)
            navigate("/")
        })
        .catch(err => {
            console.error(err)
            window.alert("가게등록 실패 ㅠㅠ")
        })
    };

    // 가게 카테고리 목록 불러오는 api
    const getCategories = (setList:any) => {
        axios.get(import.meta.env.VITE_BASE_URL + "/api/categories", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log(res.data.data.categoryList)
            setList(res.data.data.categoryList)
        })
        .catch(err => {
            console.error(err)
        })
    };

    return {
        postRegisterShop,
        getCategories
    };
};

export default RegisterShopAPI;