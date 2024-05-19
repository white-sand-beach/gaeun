import React from "react";
import { getShopInfoType } from "../../types/shop/getShopInfoType";
import EditIcon from "../../assets/mypage-change-info.png"

const ShopInfo: React.FC<getShopInfoType> = (props) => {
  return (
    <div className="flex flex-col items-center gap-3 pt-4">
      <div className="flex flex-row gap-2">
        <img
          src={props.imageURL}
          alt="가게 대표 이미지"
          className="h-[300px] rounded-[20px]"
        />
        <div className="relative flex flex-col items-center border-2 rounded-[20px] gap-3 p-3">
          <img src={EditIcon} alt="수정버튼" className="absolute w-[20px] h-[20px] right-4"/>
          <p>{props.name}</p>
          <p>{props.tel}</p>
          <p>{props.roadAddress}</p>
          <p>{props.introduction}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
