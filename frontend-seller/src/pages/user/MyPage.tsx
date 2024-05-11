import testImg from "../../assets/store-test-img.png"
import reviewIcon from "../../assets/mypage-review.png"
import infoIcon from "../../assets/mypage-change-info.png"
import menuIcon from "../../assets/mypage-change-menu.png"

const MyPage = () => {
  return (
    <div className="yes-footer top-[60px] gap-3 overflow-y-scroll">
      {/* 가게 대표 이미지 */}
      <img src={testImg} alt="가게 대표 이미지" className="w-full h-[400px]"/>

      {/* 가게명 */}
      <p>가게 상호명</p>

      {/* 가게 정보 수정과 관련된 아이콘 */}
      <div className="flex flex-row justify-around w-full mt-6">
        <div className="flex flex-col items-center gap-2 font-bold text-gray-500">
          <img src={reviewIcon} alt="리뷰조회" className="w-[80px] h-[80px]"/>
          <p>리뷰조회</p>
        </div>
        <div className="flex flex-col items-center gap-2 font-bold text-gray-500">
          <img src={infoIcon} alt="정보수정" className="w-[80px] h-[80px]"/>
          <p>정보수정</p>
        </div>
        <div className="flex flex-col items-center gap-2 font-bold text-gray-500">
          <img src={menuIcon} alt="메뉴수정" className="w-[80px] h-[80px]"/>
          <p>메뉴수정</p>
        </div>
      </div>

      {/* 지금까지 이 가게가 구한 음식? 여기 뭐 보여주나요 */}
      <h1 className="mt-10 text-3xl">여기엔 뭐 들어오기로 했죠?</h1>
    </div>
  );
};

export default MyPage;