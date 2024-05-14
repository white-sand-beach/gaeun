import React from "react";
import { SalesListInfoType } from "../../types/shop/SalesListInfoType";
import 임시사진 from "../../assets/profile.png";

const MySalesList: React.FC<SalesListInfoType> = (props) => {
  return (
    <div className="flex flex-col gap-3">
      {props.salesLists.map((list) => (
        <div
          key={list.saleId}
          className="flex flex-row gap-4 border-4 border-orange-500 rounded-lg"
        >
          <img
            src={list.imageUrl ? list.imageUrl : 임시사진}
            alt="메뉴 사진"
            className="w-[60px] h-[60px]"
          />
          <div className="flex flex-col">
            <p>메뉴명 : {list.name}</p>
            <p>원가 : {list.originalPrice}</p>
            <p>할인가 : {list.sellPrice}</p>
            <p>남은 재고 : {list.restStock}</p>
            <p>설명 : {list.content}</p>
            <p>판매상태 : {!list.isFinished ? "판매가능" : "판매종료"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MySalesList;
