import food1 from "../../assets/foods/food1.png";
import food2 from "../../assets/foods/food2.png";
import food3 from "../../assets/foods/food3.jpg";
import food4 from "../../assets/foods/food4.jpg";
import food5 from "../../assets/foods/food5.jpg";
import user1 from "../../assets/user1.jpg";

const Review = () => {
  return (
    <div>
      <div>
        {/* 사용자정보 */}
        <div className="flex items-center my-2 space-x-2">
          {/* 사용자 프로필 사진 - 실제 이미지로 교체 필요 */}
          <div className="w-10 h-10 bg-gray-300 rounded-full">
            <img
              src={user1}
              alt="user"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div>
            <p className="text-base font-semibold">팽두니</p>
          </div>
        </div>

        {/* 좋아요 및 리뷰 요약 */}
        <div className="mb-2">
          <span className="text-sm text-black">
            맛있게 잘먹었습니다~ 다음에 또 먹고싶습니다, 고기맛이 너무 맛있어요.
          </span>
        </div>

        {/* 음식 사진 - 실제 이미지로 교체 필요 */}

        <div className="flex gap-2 mt-2 overflow-x-scroll scrollbar-hide">
          {/* 각 이미지 컨테이너 */}
          <div className="min-w-[140px] h-28">
            <img
              src={food1}
              alt="food1"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-[140px] h-28">
            <img
              src={food2}
              alt="food2"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-[140px] h-28">
            <img
              src={food3}
              alt="food3"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-[140px] h-28">
            <img
              src={food4}
              alt="food4"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-[140px] h-28">
            <img
              src={food5}
              alt="food5"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* 음식명 */}
        <div className="flex gap-1">
          <div className="w-auto px-2 py-1 mt-2 text-sm bg-white border-2 border-gray-400 rounded-full shadow-xl max-w-max">
            <p>순살코기</p>
          </div>
          <div className="w-auto px-2 py-1 mt-2 text-sm bg-white border-2 border-gray-400 rounded-full shadow-xl max-w-max">
            <p>삼겹살</p>
          </div>
        </div>
        <hr className="w-full mt-3" />
      </div>
    </div>
  );
};

export default Review;
