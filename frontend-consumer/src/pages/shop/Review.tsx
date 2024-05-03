import ReviewDeleteButton from "../../components/button/ReviewDeleteButton";

import food1 from "../../assets/foods/food1.png";
import user1 from "../../assets/user1.jpg";

const Review = () => {
  return (
    <div>
      <div className="p-4">
        {/* 사용자정보 */}
        <div className="between my-2 space-x-2">
          {/* 사용자 프로필 사진 - 실제 이미지로 교체 필요 */}
          <div className="center">
            <img
              src={user1}
              alt="user"
              className="w-6 h-6 object-cover rounded-full"
            />
            <p className="text-base font-semibold ml-2">userName</p>
          </div>
          <p className="text-xs font-bold text-gray-500">2024.05.03</p>
        </div>

        <p className="menu-name shadow-none my-1">
          숙성돈까스전문점 백돈 대구직영점 {">"}
        </p>

        {/* 좋아요 및 리뷰 요약 */}
        <div className="mb-2">
          <span className="text-sm text-black">
            맛있게 잘먹었습니다~ 다음에 또 먹고싶습니다, 고기맛이 너무 맛있어요.
          </span>
        </div>

        {/* 음식 사진 - 실제 이미지로 교체 필요 */}

        <div className="flex gap-2 mt-2">
          {/* 각 이미지 컨테이너 */}
          <img src={food1} alt="food1" className="object-cover w-full h-full" />
        </div>

        {/* 음식명 */}
        <div className="between mt-2">
          <div className="flex gap-1 text-gray-500">
            <div className="menu-name">
              <p>메뉴명</p>
            </div>
          </div>
          <ReviewDeleteButton />
        </div>
      </div>
      <hr className="mx-2" />
    </div>
  );
};

export default Review;