import React from "react"
import { getShopInfoType } from "../../types/shop/getShopInfoType"

import reviewImg from "../../assets/mypage-review.png"
import updateInfoImg from "../../assets/mypage-change-info.png"
import updateMenuImg from "../../assets/mypage-change-menu.png"

const ShopInfo:React.FC<getShopInfoType> = (props) => {
    return (
        <div className="flex flex-col items-center">
            <img src={props.imageURL} alt="가게 대표 이미지" className="w-full h-[300px]"/>
            <h1>가게명 : {props.name}</h1>
            <h1>가게번호 : {props.tel}</h1>
            <h1>가게주소 : {props.roadAddress}</h1>

            <div className="flex flex-row justify-around w-full text-gray-500">
                <div className="flex flex-col items-center">
                    <img src={reviewImg} alt="리뷰 아이콘" className="w-[80px] h-[80px]" />
                    <p>리뷰조회</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src={updateInfoImg} alt="리뷰 아이콘" className="w-[80px] h-[80px]" />
                    <p>정보수정</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src={updateMenuImg} alt="리뷰 아이콘" className="w-[80px] h-[80px]" />
                    <p>메뉴수정</p>
                </div>
            </div>
        </div>
    );
};

export default ShopInfo;