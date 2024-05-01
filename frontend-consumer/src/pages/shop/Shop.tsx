import heartIcon from "../../assets/shop/heart.png";
import phoneIcon from "../../assets/shop/phone.png";
import KakaoMap from "../main/Kakaomap";
import { useState } from "react";
import ShopInformation from "./ShopInformation";
import ShopReview from "./ShopReview";
import ShopMenu from "./ShopMenu";

const mapHeight = "105px"; // 예시 높이값
const lat = 36.093952;
const lng = 128.4243456;
const updateCounter = 0;

const Shop = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      {/* Header image container */}
      <div className="bg-black h-[150px] text-white center mb-8 ">
        {/* 이미지 태그는 나중에 넣을 예정입니다. */}
        <span>사진 들어가는 곳</span>
      </div>

      <div className="my-4 text-center">
        {/* Shop Details */}
        <h1 className="text-xl font-bold">대영이와 현성이의 치킨</h1>

        {/* Icons and details */}
        <div className="flex items-center justify-center mt-2 space-x-3">
          <div className="flex items-center">
            <img src={phoneIcon} alt="Phone" className="w-5 h-5 mr-1" />
            <span className="text-sm">전화</span>
          </div>

          <div className="flex items-center">
            <img src={heartIcon} alt="Heart" className="w-5 h-5 mr-1" />
            <span className="text-sm">72</span>
          </div>
        </div>

        {/* Other details */}
        <div className="flex flex-col items-center mt-2 ">
          <span className="text-sm text-gray-600">
            리뷰 수 686 | 마감 시간 21:00
          </span>
        </div>
      </div>
      {/* 위치 정보 */}
      <div className="flex mb-2 w-[330px] border-2 rounded-xl px-4 py-2 shadow-xl mx-auto">
        <div className="mr-5">
          <p className="text-sm font-semibold whitespace-nowrap ">위치안내</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">
            경상북도 구미시 인의동 590-2 (삼산 세빛타운 맞은편 2층)
          </p>
          <p className="text-xs text-gray-600">
            (한송스포타운 맞은편 42m, 도보 1분)
          </p>
        </div>
      </div>
      {/* 지도 정보 */}
      <div className="flex mb-2 w-[330px] h-32 border-2 rounded-xl px-4 py-2 shadow-xl mt-5 mx-auto">
        <div className="mr-5">
          <p className="text-sm font-semibold whitespace-nowrap ">지도안내</p>
        </div>
        <div className="z-0 w-full border border-black">
          <KakaoMap
            height={mapHeight}
            lat={lat}
            lng={lng}
            updateCounter={updateCounter}
          />
        </div>
      </div>
      {/* 탭 버튼 */}
      <div className="flex justify-around w-full mt-5 mb-0.5">
        <button
          className={`my-1 py-2 px-10 text-xs ${activeTab === "details" ? "bg-orange-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("details")}
        >
          메뉴
        </button>
        <button
          className={`my-1 py-2 px-10 text-xs ${activeTab === "menu" ? "bg-orange-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("menu")}
        >
          정보ㆍ원산지
        </button>
        <button
          className={`my-1 py-2 px-10 text-xs ${activeTab === "review" ? "bg-orange-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("review")}
        >
          리뷰
        </button>
      </div>

      {/* 탭 내용 */}
      <div>
        {activeTab === "details" && (
          <div className="pb-16">
            <ShopMenu />
          </div>
        )}
        {activeTab === "menu" && (
          <div className="pb-16">
            <ShopInformation />
          </div>
        )}
        {activeTab === "review" && (
          <div className="pb-16">
            <ShopReview />
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
