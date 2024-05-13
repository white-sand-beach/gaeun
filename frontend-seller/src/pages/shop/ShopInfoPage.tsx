import { useEffect, useState } from "react";
import { getShopInfoType } from "../../types/shop/getShopInfoType";
import getShopInfoAPI from "../../service/shop/getShopInfoAPI";
import ShopInfo from "../../components/shop/ShopInfo";
import MySalesList from "../../components/shop/MySalesList";
import { SalesInfoType } from "../../types/shop/SalesInfoType";
import GetMySalesListAPI from "../../service/shop/GetMySalesListAPI";

const ShopInfoPage = () => {
    // 가게 정보
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
                name: "",
                imageURL: ""
            }
        ]
    });
    // 판매 내역 정보
    const [salesLists, setSalesLists] = useState<SalesInfoType[]>([])

    const { getSalesSeller } = GetMySalesListAPI()
    const { getShopInfo } = getShopInfoAPI();

    useEffect(() => {
        getShopInfo(setShopInfo)
        getSalesSeller(setSalesLists)
    }, []);

    return (
        <div className="yes-footer top-[60px] overflow-y-scroll gap-3">
            <ShopInfo
                imageURL={shopInfo.imageURL}
                name={shopInfo.name}
                roadAddress={shopInfo.roadAddress}
                tel={shopInfo.tel} />
            <hr />
            <hr />
            <hr />
            <h1>등록된 판매 목록</h1>
            {salesLists &&
                <>
                    <MySalesList
                        salesLists={salesLists} />
                </>}
        </div>
    );
};

export default ShopInfoPage;