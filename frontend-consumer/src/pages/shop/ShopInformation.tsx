const ShopInformation = () => {
  return (
    <div className="bg-white">
      {/* Shop Information Section */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">대영이와 현성이의 치킨</h3>
        <div className="mb-4 text-sm">
          <div className="mb-2">
            <span className="font-medium">상호명 : </span>대영이와 현성이의 치킨
          </div>
          <div className="mb-2">
            <span className="font-medium">영업시간 : </span>매일 - 오전 12:00 ~
            11:50
          </div>
          <div className="mb-2">
            <span className="font-medium">휴무일 : </span> 매일
          </div>
          <div className="mb-2">
            <span className="font-medium">전화번호 : </span> 010-3351-5730
          </div>
          <div className="mb-2">
            <span className="font-medium">사업자등록번호 : </span> 371-120472-12
          </div>
          <div className="mb-2">
            <span className="font-medium">주소 : </span> 경상북도 구미시 인의동
            590-2 (삼산 세빛타운 맞은편 2층)
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Additional Information */}
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">가게 소개</h3>
          <p className="text-sm">
            매일 신선지속으로 도소매를 통해 신선하게 산어시장입니다.
          </p>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">원산지 소개</h3>
        </div>
      </div>
    </div>
  );
};

export default ShopInformation;
