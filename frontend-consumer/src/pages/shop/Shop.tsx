import heartIcon from "../../assets/shop/heart.png";
import phoneIcon from "../../assets/shop/phone.png";
import KakaoMap from "../main/Kakaomap";

const mapHeight = "100px"; // 예시 높이값
const lat = 36.093952;
const lng = 128.4243456;
const updateCounter = 0;

const Shop = () => {
  return (
    <div className="max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      {/* Header image container */}
      <div className="flex items-center justify-center mb-8 text-white bg-black h-36 sm:h-48 md:h-56 lg:h-64 xl:h-72">
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
        <div className="flex flex-col items-center mt-2">
          <span className="text-sm text-gray-600">
            리뷰 수 686 | 마감 시간 21:00
          </span>
        </div>
      </div>
      {/* 위치 정보 */}
      <div className="flex mb-2 w-[330px] border-2 rounded-xl px-4 py-2 shadow-xl ">
        <div className="mr-5">
          <p className="text-sm font-semibold whitespace-nowrap ">위치안내</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">
            경상북도 구미시 인의동 590-2 (삼산 세빛타운 맞은편 2층 자미마)
          </p>
          <p className="text-xs text-gray-600">
            (한송스포타운 맞은편 42m, 도보 1분)
          </p>
        </div>
      </div>
      {/* 지도 정보 */}
      <div className="flex mb-2 w-[330px] h-32 border-2 rounded-xl px-4 py-2 shadow-xl mt-5 ">
        <div className="mr-5">
          <p className="text-sm font-semibold whitespace-nowrap ">지도안내</p>
        </div>
        <div className="w-full border border-black">
          <KakaoMap
            height={mapHeight}
            lat={lat}
            lng={lng}
            updateCounter={updateCounter}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
