import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterShopType } from "../../types/shop/RegisterShopType";
import Cookies from "universal-cookie";
import { CategoryIdType } from "../../types/shop/CategoryIdType";
import useSellerStore from "../../store/user/UsesellerStore";

const RegisterShopAPI = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    // 쿠키에서 토큰 가져오기
    const accessToken = cookies.get("accessToken");

    // 스토어 id 저장하기 위한  useSellerStore 훅
    const { updateSellerStore } = useSellerStore();

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
    }: RegisterShopType) => {
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
            updateSellerStore("stordId", res.data.data.storeId)
            navigate("/")
        })
        .catch(err => {
            console.error(err)
            window.alert("가게등록 실패 ㅠㅠ")
        })
    };

    // 가게 카테고리 목록 불러오는 api
    const getCategories = ({setId}:CategoryIdType) => {
        axios.get(import.meta.env.VITE_BASE_URL + "/api/categories", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log(res.data.data.categoryList)
            setId(res.data.data.categoryList)
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