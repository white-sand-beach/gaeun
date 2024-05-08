import shopImage from "../../assets/shop/shop.png";
import notification from "../../assets/shop/notification.png";
import origin from "../../assets/shop/origin.png";
import shoplist from "../../assets/shop/shoplist.png";

const ShopInformation = () => {
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
            <span className="font-medium">영업시간 : </span> 매일 - 오전 12:00 ~
            11:50
          </div>
          <div className="mb-2">
            <span className="font-medium">휴무일 : </span> 매일
          </div>
          <div className="mb-2">
            <span className="font-medium">전화번호 : </span> 010-3351-5730
          </div>
          <div className="mb-2">
            <span className="font-medium">주소 : </span> 경상북도 구미시 인의동
            590-2 (삼산 세빛타운 맞은편 2층)
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
            <p className="text-sm">
              매일 신선지속으로 도소매를 통해 신선하게 산어시장입니다. 저희
              <br />
              대영이와 현성이가 튀기는 치킨집에 와주셔서 감사드립니다.
            </p>
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
            <span className="font-medium">상호명 : </span>대영이와 현성이의 치킨
          </div>
          <div className="mb-2">
            <span className="font-medium">대표자명 : </span>김대영
          </div>
          <div className="mb-2">
            <span className="font-medium">사업자등록번호 : </span>272-44-01011
          </div>
        </div>

        {/* Divider */}
        <div className="flex">
          <img src={origin} alt="origin" className="w-4 h-4 mt-1" />
          <p className="ml-1 text-base font-bold">원산지정보</p>
        </div>
        <hr className="w-full my-1" />

        <div className="mb-8 text-sm">
          <p className="text-sm">
            초밥메뉴[연어:러시아산, 장어:일본산, 안현성:한국산]
            <br />
            튀김메뉴[새우:북한산, 가지:한국산]
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopInformation;
