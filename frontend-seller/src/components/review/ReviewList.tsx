import React, { useEffect, useState } from "react";
import { ReviewListType } from "../../types/review/ReviewListType";
import getReviewAPI from "../../service/review/getReviewAPI";

const ReviewList: React.FC = () => {
  const [ reviewInfo, setReviewInfo ] = useState<ReviewListType>({
    reviewList: [
      {
        reviewId: 0,
        content: "",
        imageUrl: "",
        consumerId: 0,
        nickname: "",
        storeId: 0,
        storeName: "",
        createdAd: "",
      },
    ],
    page: 0,
    hasNext: false,
    totalCnt: 0,
  })

  useEffect(() => {
    const fetchReviewInfo = async () => {
      try {
        const response = await getReviewAPI(reviewInfo.page, 10);
        console.log(response.data.data)
        setReviewInfo(response.data.data)
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchReviewInfo()
  }, []);
  

  return (
    <div className="w-screen h-full flex flex-col gap-3 overflow-y-scroll">
      {reviewInfo.reviewList.map((list) => (
        <div key={list.reviewId}>
          <img src={list.imageUrl} alt="" />
          <p>작성일자 : {list.createdAd}</p>
          <p>가게 : {list.storeName}</p>
          <p>닉네임 : {list.nickname}</p>
          <p>내용 : {list.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
