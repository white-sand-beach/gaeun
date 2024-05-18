import React from "react";
import TestProfile from "../../assets/test-img.png";

const ReviewList: React.FC = () => {
  const reviewlists = [
    {
      consumerProfile: TestProfile,
      consumerName: "임수빉",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reviewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)",
    },
    {
      consumerProfile: TestProfile,
      consumerName: "임수빙",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reviewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)",
    },
    {
      consumerProfile: TestProfile,
      consumerName: "임숨빚",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reviewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)",
    },
    {
      consumerProfile: TestProfile,
      consumerName: "임수미",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reviewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)",
    },
    {
      consumerProfile: TestProfile,
      consumerName: "임숨빙",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reviewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)",
    },
    {
      consumerProfile: TestProfile,
      consumerName: "림수빔",
      shopName: "대용이네 치킨가게",
      orderDate: "2024-05-05",
      reviewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)",
    },
  ];
  return (
    <div className="w-screen h-full flex flex-col gap-3 overflow-y-scroll">
      {/* 손님 프로필사진 */}
      {reviewlists.map((review, index) => (
        <div key={index} className="flex flex-row">
          <img
            src={review.consumerProfile}
            alt=""
            className="w-[80px] h-[80px]"
          />
          {/* 리뷰 관련 내용 */}
          <div className="flex flex-col w-full bg-gray-200 rounded-[10px] p-3 mx-2">
            <div className="flex w-full justify-between">
              <div className="flex flex-row gap-2">
                <p className="text-xl font-bold">{review.consumerName}</p>
                <p className="font-bold">{review.shopName}</p>
              </div>
              <div className="flex flex-row gap-2">
                <button className="bg-gray-300 w-[80px] rounded-[10px] text-red-500 font-bold">
                  신고
                </button>
                <p>{review.orderDate}</p>
              </div>
            </div>
            <p>{review.reviewContent}</p>
            <div className="flex flex-col items-center">
              <img src={review.reviewImg} alt="" className="w-[200px]" />
            </div>
            <div className="w-[300px] h-[40px] text-white bg-mainColor rounded-[20px] font-bold flex justify-center items-center">
              {review.foodName}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
