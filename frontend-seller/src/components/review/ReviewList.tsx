import React, { useEffect, useState } from "react";
import { ReviewListType } from "../../types/review/ReviewListType";
import getReviewAPI from "../../service/review/getReviewAPI";

const ReviewList: React.FC = () => {
  const [ reviewInfo, setReviewInfo ] = useState<ReviewListType>({
    reviewList: [],
    page: 0,
    hasNext: false,
    totalCnt: 0,
  })

  useEffect(() => {
    const fetchReviewInfo = async () => {
      try {
        const response = await getReviewAPI(reviewInfo.page, 10);
        console.log(response.data.data)
        setReviewInfo((prev) => ({
          ...prev,
          reviewList: [...prev.reviewList, response.data.data.reviewList],
          hasNext: response.data.data.hasNext,
        }))
      }
      catch (err) {
        console.error(err)
      }
    }
    fetchReviewInfo()
  }, [reviewInfo.page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollH = document.documentElement.scrollHeight;
      const scrollT = document.documentElement.scrollTop;
      const clientH = document.documentElement.clientHeight;

      if (scrollT + clientH >= scrollH && reviewInfo.hasNext) {
        setReviewInfo((prev) => ({
          ...prev,
          page: prev.page + 1,
        }))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [reviewInfo.hasNext])
  

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
