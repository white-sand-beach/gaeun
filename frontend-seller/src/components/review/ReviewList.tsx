import React, { useEffect, useState } from "react";
import { ReviewListType } from "../../types/review/ReviewListType";
import getReviewAPI from "../../service/review/getReviewAPI";
import logo from "../../assets/logo/logo.png";

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
    <div className="flex flex-col  gap-3 ">
      {reviewInfo.reviewList.map((item, index) => (
        <div>
          <div key={index} className="justify-between mx-4 flex flex-row gap-4">
            <div className="flex items-start">
              <div className="relative flex items-center justify-center min-w-[100px] min-h-[100px] mr-10 bg-white border-4 shadow-lg border-gray-200  rounded-full">
                <img
                  src={item.imageUrl || logo}
                  alt="손님 프로필 이미지"
                  className="w-[85px] h-[85px] object-cover rounded-full"
                />
              </div>
              <div className=" font-bold text-[20px]">
                <p className="text-[24px] text-blue-500">
                  {item.nickname}
                  <span className="text-[20px] text-black">님이</span>{" "}
                  {item.storeName}{" "}
                  <span className="text-[20px] text-black">사장님에게</span>{" "}
                </p>
                <p>감사의 마음을 전했어요!</p>
                <p className="pt-4">{item.content}</p>
              </div>
            </div>
            <div className=" font-bold text-[20px]">
              <p> {item.createdAt}</p>
            </div>
          </div>
          <hr className="border my-4 border-gray-400 mx-4" />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
