import { useEffect, useState } from "react";
import { getShopInfoType } from "../../types/shop/getShopInfoType";
import getShopInfoAPI from "../../service/shop/getShopInfoAPI";
import ShopInfo from "../../components/shop/ShopInfo";
import MySalesList from "../../components/shop/MySalesList";
import { SalesInfoType } from "../../types/shop/SalesInfoType";
import GetMySalesListAPI from "../../service/shop/GetMySalesListAPI";
import MenuListPage from "../menu/MenuListPage";

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
        imageURL: "",
      },
    ],
  });
  // 판매 내역 정보
  const [salesLists, setSalesLists] = useState<SalesInfoType[]>([]);
  const [listTap, setListTap] = useState<number>(1);
  const { getSalesSeller } = GetMySalesListAPI();
  const { getShopInfo } = getShopInfoAPI();

  useEffect(() => {
    getShopInfo(setShopInfo);
    getSalesSeller(setSalesLists);
  }, []);

  return (
    <div className="yes-footer top-[65px] overflow-y-scroll gap-3">
      <ShopInfo
        imageURL={shopInfo.imageURL}
        name={shopInfo.name}
        roadAddress={shopInfo.roadAddress}
        tel={shopInfo.tel}
      />
      <div className="w-full flex flex-row">
        <div onClick={() => setListTap(1)} className="w-full">
          <h1
            className={`border-b-2 w-full flex flex-row justify-center items-center h-[60px] ${listTap === 1 ? "bg-orange-300 border-2" : ""}`}
          >
            리뷰
          </h1>
        </div>
        <div onClick={() => setListTap(2)} className="w-full">
          <h1
            className={`border-b-2 w-full flex flex-row justify-center items-center h-[60px] ${listTap === 3 ? "bg-orange-300 border-2" : ""}`}
          >
            등록된 물품 목록
          </h1>
        </div>
      </div>
      {listTap === 2 && <MySalesList salesLists={salesLists} />}
    </div>
  );
};

export default ShopInfoPage;
