import { reviewListItem } from "../../types/ReviewType";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/windows11/LargeTile.scale-100.png";

const Review = ({ reviewList }: { reviewList: reviewListItem[] }) => {
  const navigate = useNavigate();
  // reviewList가 비어있을 때 로딩 상태를 보여줄 수 있도록 추가
  if (reviewList.length === 0) {
    return (
      <div className="h-screen pb-40 center">
        <div className="items-center justify-center">
          <img className="rounded-full" src={logo} alt="로고" />
          <h2 className="text-lg font-bold center">감사편지를 써볼까요?</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 space-y-4">
      {reviewList.map((review) => (
        <div
          key={review.reviewId}
          className="p-4 bg-white rounded-lg shadow-md"
        >
          {/* 사용자정보 */}
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center space-x-2">
              {/* 사용자 프로필 사진 */}
              <img
                src={review.imageUrl}
                alt="user"
                className="object-cover w-10 h-10 rounded-full"
              />
              <p className="text-lg font-semibold">{review.nickname}</p>
            </div>
            <p className="text-base font-bold text-gray-500">
              {review.createdAt}
            </p>
          </div>

          {/* 가게 이름 */}
          <p
            onClick={() => {
              navigate(`/shop/${review.storeId}`);
            }}
            className="my-1 text-lg text-blue-500 cursor-pointer"
          >
            {review.storeName} {">"}
          </p>

          {/* 리뷰 내용 */}
          <div className="mb-2">
            <span className="text-base text-black">{review.content}</span>
          </div>

          {/* 음식 사진 */}
          <div className="flex justify-center mt-2">
            <img
              src={review.imageUrl}
              alt="food"
              className="object-cover rounded-lg w-44 h-44"
            />
          </div>
        </div>
      ))}
      <hr className="mt-4" />
    </div>
  );
};

export default Review;
