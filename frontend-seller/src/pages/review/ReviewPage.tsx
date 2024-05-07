import ReviewList from "@/components/review/ReviewList";
import TestProfile from "@/assets/test-img.png"

const ReviewPage = () => {
  const reviewlists = [
    {
      consumerProfile: TestProfile,
      consumerName: "임수빉",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reivewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)"
    },
    {
      consumerProfile: TestProfile,
      consumerName: "임수빙",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reivewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)"
    },
    {
      consumerProfile: TestProfile,
      consumerName: "임숨빚",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reivewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)"
    },
    {
      consumerProfile: TestProfile,
      consumerName: "임수미",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reivewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)"
    },
    {
      consumerProfile: TestProfile,
      consumerName: "임숨빙",
      shopName: "대영이네 치킨가게",
      orderDate: "2024-05-05",
      reivewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)"
    },
    {
      consumerProfile: TestProfile,
      consumerName: "림수빔",
      shopName: "대용이네 치킨가게",
      orderDate: "2024-05-05",
      reivewContent: "음식이 맛있고 신선하네요 ㅋㅋ",
      reviewImg: TestProfile,
      foodName: "두툼 닭다리살 (저세상 두꺼움)"
    },
  ]

  return (
    <div className="yes-footer top-[60px]">
      <div className="flex flex-row justify-between w-full">
        <button className="selected-btn">모든 리뷰 보기</button>
        <button className="no-selected-btn">사진 리뷰만 보기</button>
      </div>
      <div className="flex flex-row justify-start w-full relative left-16 top-4">
        <p className="text-2xl font-bold">최근 리뷰 130개</p>
      </div>
      <div className="fixed flex flex-col items-center overflow-y-scroll top-[180px] gap-3 max-h-[calc(100vh-245px)]">
        {reviewlists.map((reviewlist, index) =>
        <div key={index}>
          <ReviewList 
          consumerProfile={reviewlist.consumerProfile}
          consumerName={reviewlist.consumerName}
          shopName={reviewlist.shopName}
          orderDate={reviewlist.orderDate}
          reviewContent={reviewlist.reivewContent}
          reivewImg={reviewlist.reviewImg}
          foodName={reviewlist.foodName} />
        </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
