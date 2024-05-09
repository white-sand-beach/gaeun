import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { RegisterShopType } from "../../types/shop/RegisterShopType";
import Cookies from "universal-cookie";

const RegisterShopAPI = () => {
    // const navigate = useNavigate()
    const cookies = new Cookies();
    // 쿠키에서 토큰 가져오기
    const accessToken = cookies.get("accessToken")

    // 가게 등록 api
    const postRegisterStore = ({
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
        axios.post(import.meta.env.VITE_BASE_URL + "/api/stores", {
            "registeredName": shopName,
            "bossName": shopOwner,
            "address": shopzibunAddr,
            "roadAddress": shoproadAddr,
            "latitude": shopLat,
            "longitude": shopLon,
            "tel": shopNumber,
            "name": shopName,
            "image": shopImage,
            "operatingTime": shopWorkday,
            "holiday": shopHoliday,
            "originCountry": FoodOrigin,
            "introduction": shopIntro,
            "categoryIdList": shopCategoryId,
        })
        .then(res => {
            console.log(res)
            console.log("가게등록 성공")
        })
        .catch(err => {
            console.log("가게등록 실패")
            console.error(err)
        })
    }

    // 가게 카테고리 목록 불러오는 api
    const getCategories = () => {
        axios.get(import.meta.env.VITE_BASE_URL + "/api/categories", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    return {
        postRegisterStore,
        getCategories
    };
};

export default RegisterShopAPI;