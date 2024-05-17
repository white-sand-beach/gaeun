import React from "react";
import { getShopInfoType } from "../../types/shop/getShopInfoType";

const ShopInfo: React.FC<getShopInfoType> = (props) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-row gap-2">
        <img
          src={props.imageURL}
          alt="가게 대표 이미지"
          className="h-[300px] rounded-[20px]"
        />
        <div className="flex flex-col items-center border-2 rounded-[20px] gap-3 p-3">
          <p>{props.name}</p>
          <p>{props.tel}</p>
          <p>{props.roadAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
