import React from "react";
import { ReviewType } from "../../types/ReviewType";

const ReviewList: React.FC<ReviewType> = (props) => {
  return (
    <div className="w-screen h-full flex flex-row">
      {/* 손님 프로필사진 */}
      <img src={props.consumerProfile} alt="" className="w-[80px] h-[80px]" />

      {/* 리뷰 관련 내용 */}
      <div className="flex flex-col w-full bg-gray-200 rounded-[10px] p-3 mx-2">
        <div className="flex gap-2 w-full">
          <p className="text-xl font-bold">{props.consumerName}</p>
          <p className="font-bold">{props.shopName}</p>
        </div>
        <p>{props.reviewContent}</p>
        <div className="flex flex-col items-center">
          <img src={props.reivewImg} alt="" className="w-[200px]" />
        </div>
        <div className="w-[300px] h-[40px] text-white bg-mainColor rounded-[20px] font-bold flex justify-center items-center">
          {props.foodName}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
