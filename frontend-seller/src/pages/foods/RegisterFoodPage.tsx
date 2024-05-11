import { useState } from "react";
import RegisterFood from "../../components/foods/RegisterFood.tsx";
import RegisterFoodAPI from "../../service/foods/RegisterFoodAPI.ts";
import Cookies from "universal-cookie";

const RegisterFoodPage = () => {
    // 등록할 음식에 대한 기본 정보
    const [foodInfo, setFoodInfo] = useState({
        image: "",
        name: "",
        originalPrice: 0,
        sellPrice: 0,
    });

    const cookies = new Cookies()

    const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setFoodInfo({
            ...foodInfo,
            [name]: value,
        });
        console.log(`${name} : ${value}`)
    };

    // 메뉴 등록을 위한 api import
    const { postRegisterFood } = RegisterFoodAPI();

    // 메뉴 등록 요청
    const handleRegisterMenu = () => {
        postRegisterFood({
            image: foodInfo.image,
            name: foodInfo.name,
            originalPrice: foodInfo.originalPrice,
            sellPrice: foodInfo.sellPrice,
            storeId: cookies.get("storeId")
        });
    };

    return (
        <div className="no-footer top-[70px] gap-3">
            <RegisterFood 
            image={foodInfo.image}
            name={foodInfo.name}
            originalPrice={foodInfo.originalPrice}
            sellPrice={foodInfo.sellPrice}
            onChangeInput={handleChangeInfo}
            onRegisterFood={handleRegisterMenu}
            />
        </div>
    );
};

export default RegisterFoodPage;