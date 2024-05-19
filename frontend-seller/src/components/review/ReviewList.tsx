import React, { useEffect, useState } from "react";
import { ReviewListType } from "../../types/review/ReviewListType";
import getReviewAPI from "../../service/review/getReviewAPI";
import logo from "../../assets/logo/logo.png"

const ReviewList: React.FC = () => {
  const [reviewInfo, setReviewInfo] = useState<ReviewListType>({
    reviewList: [],
    page: 0,
    hasNext: false,
    totalCnt: 0,
  });

  useEffect(() => {
    const fetchReviewInfo = async () => {
      try {
        const response = await getReviewAPI(reviewInfo.page, 1000);
        console.log(response.data.data);
        setReviewInfo((prev) => ({
          ...prev,
          reviewList: [...prev.reviewList, ...response.data.data.reviewList],
          hasNext: response.data.data.hasNext,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviewInfo();
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
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reviewInfo.hasNext]);

  return (
    <div className="flex flex-col w-screen h-full gap-3">
      {reviewInfo.reviewList.map((item, index) => (
        <div key={index} className="mx-4 flex flex-row gap-4">
          <img src={item.imageUrl ? item.imageUrl : logo} alt="손님 프로필 이미지" className="w-[100px] h-[100px]" />
          <div>
          <p>작성일자 : {item.createdAt}</p>
          <p>가게 : {item.storeName}</p>
          <p>닉네임 : {item.nickname}</p>
          <p>내용 : {item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
