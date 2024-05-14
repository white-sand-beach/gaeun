import React from "react"
import { getShopInfoType } from "../../types/shop/getShopInfoType"

import reviewImg from "../../assets/mypage-review.png"
import updateInfoImg from "../../assets/mypage-change-info.png"
import updateMenuImg from "../../assets/mypage-change-menu.png"
import OpenShopAPI from "../../service/shop/OpenShopAPI"

const ShopInfo:React.FC<getShopInfoType> = (props) => {
    const { putShopOpened } = OpenShopAPI();
    const handleOpened = () => {
        putShopOpened();
    };
    
    return (
        <div className="flex flex-col items-center gap-3">
            <button className="common-btn" onClick={handleOpened}>가게 영업 할까말까</button>
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