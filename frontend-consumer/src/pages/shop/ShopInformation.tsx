import shopImage from "../../assets/shop/shop.png";
import notification from "../../assets/shop/notification.png";
import origin from "../../assets/shop/origin.png";
import shoplist from "../../assets/shop/shoplist.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShopDetail } from "../../types/ShopDetailType";
import ShopDetailGetForm from "../../services/shops/ShopDetailGetService";

const ShopInformation = () => {
  const { Id } = useParams();
  const [shopDetail, setShopDetail] = useState<ShopDetail>({
    registeredName: "",
    bossName: "",
    address: "",
    roadAddress: "",
    tel: "",
    name: "",
    operatingTime: "",
    holiday: "",
    originCountry: "",
    introduction: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShopDetailGetForm({ Id });
        setShopDetail(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    fetchData();
  }, [Id]);

  return (
    <div className="bg-white">
      {/* Shop Information Section */}
      <div className="p-4">
        <div className="flex">
          <img src={shopImage} alt="ShopImage" className="w-4 h-4 mt-1" />
          <p className="ml-1 text-base font-bold">가게정보</p>
        </div>
        <hr className="w-full my-1" />
        <div className="mb-8 text-sm">
          <div className="mb-2">
            <span className="font-medium">영업시간 : </span>
            {shopDetail.operatingTime}
          </div>
          <div className="mb-2">
            <span className="font-medium">휴무일 : </span> {shopDetail.holiday}
          </div>
          <div className="mb-2">
            <span className="font-medium">전화번호 : </span> {shopDetail.tel}
          </div>
          <div className="mb-2">
            <span className="font-medium">주소 : </span> {shopDetail.address} (
            {shopDetail.roadAddress})
          </div>
        </div>

        {/* Divider */}
        <div className="flex">
          <img src={notification} alt="notification" className="w-4 h-4 mt-1" />
          <p className="ml-1 text-base font-bold">사장님 공지</p>
        </div>
        <hr className="w-full my-1" />

        <div className="mb-8 text-sm">
          {/* 가게소개 및 공지 */}
          <div className="mb-4">
            <p className="text-sm">{shopDetail.introduction}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex">
          <img src={shoplist} alt="shoplist" className="w-4 h-4 mt-1" />
          <p className="ml-1 text-base font-bold">사업자정보</p>
        </div>
        <hr className="w-full my-1" />

        <div className="mb-8 text-sm">
          <div className="mb-2">
            <span className="font-medium">상호명 : </span>
            {shopDetail.registeredName}
          </div>
          <div className="mb-2">
            <span className="font-medium">가게명 : </span>
            {shopDetail.name}
          </div>
          <div className="mb-2">
            <span className="font-medium">대표자명 : </span>
            {shopDetail.bossName}
          </div>
        </div>

        {/* Divider */}
        <div className="flex">
          <img src={origin} alt="origin" className="w-4 h-4 mt-1" />
          <p className="ml-1 text-base font-bold">원산지정보</p>
        </div>
        <hr className="w-full my-1" />

        <div className="mb-8 text-sm">
          <p className="text-sm">{shopDetail.originCountry}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopInformation;
