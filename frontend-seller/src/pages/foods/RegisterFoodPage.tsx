import { useState } from "react";
import RegisterFood from "../../components/foods/RegisterFood.tsx";
import RegisterFoodAPI from "../../service/foods/RegisterFoodAPI.ts";
import TotalButton from "../../components/ui/TotalButton.tsx";
import Cookies from "universal-cookie";

type foodInfo = {
    image: File | null;
    name: string;
    originalPrice: number;
    sellPrice: number;
}
const RegisterFoodPage = () => {
    // 등록할 음식에 대한 기본 정보
    const cookies = new Cookies()
    const storeId = cookies.get("storeId")
    const [foodInfo, setFoodInfo] = useState<foodInfo>({
        image: null,
        name: "",
        originalPrice: 0,
        sellPrice: 0,
    });

    const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setFoodInfo({
            ...foodInfo,
            [name]: value,
        });
        console.log(`${name} : ${value}`)
    };

    const handleChangeImg = (image: File|null) => {
        setFoodInfo({
            ...foodInfo,
            image: image
        })
    }

    // 메뉴 등록을 위한 api import
    const { postRegisterFood } = RegisterFoodAPI();

    // 메뉴 등록 요청
    const handleRegisterMenu = () => {
        postRegisterFood({
            image: foodInfo.image,
            name: foodInfo.name,
            originalPrice: foodInfo.originalPrice,
            sellPrice: foodInfo.sellPrice,
            storeId: storeId
        });
    };

    return (
        <div className="no-footer top-[70px]">
            <RegisterFood 
            image={foodInfo.image}
            name={foodInfo.name}
            originalPrice={foodInfo.originalPrice}
            sellPrice={foodInfo.sellPrice}
            onChangeInput={handleChangeInfo}
            onChangeImg={handleChangeImg}
            onRegisterFood={handleRegisterMenu}
            />
            <TotalButton title="메뉴 등록하기" onClick={handleRegisterMenu} />
        </div>
    );
};

export default RegisterFoodPage;