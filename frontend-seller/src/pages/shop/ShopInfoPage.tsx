import { useEffect, useState } from "react";
import { getShopInfoType } from "../../types/shop/getShopInfoType";
import getShopInfoAPI from "../../service/shop/getShopInfoAPI";
import ShopInfo from "../../components/shop/ShopInfo";

const ShopInfoPage = () => {
    const [shopInfo, setShopInfo] = useState<getShopInfoType>({
        registeredName: "",
        registeredNo: 0,
        bossName: "",
        address: "",
        roadAddress: "",
        latitude: 0,
        longitude: 0,
        tel: "",
        name: "",
        imageURL: "",
        operatingTime: "",
        holiday: "",
        originCountry: "",
        introduction: "",
        categoryList: [
            {
                categoryId: 0,
                name:  "",
                imageURL: ""
            }
        ]
    })
    const { getShopInfo } = getShopInfoAPI()

    useEffect(() => {
        getShopInfo(setShopInfo)
    }, [])

    return (
        <div className="yes-footer top-[60px] overflow-y-scroll">
            <ShopInfo 
            imageURL={shopInfo.imageURL}
            name={shopInfo.name}
            roadAddress={shopInfo.roadAddress}
            tel={shopInfo.tel}/>
            <h1>등록된 판매 목록</h1>
        </div>
    );
};

export default ShopInfoPage;