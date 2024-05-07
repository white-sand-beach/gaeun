import React from "react";
import { SalesType } from "@/types/SalesType";

const SalesList: React.FC<SalesType> = (props) => {
    return (
        <div className="w-screen list-component normal-size-list">
            <div className="flex justify-between text-xl font-bold text-gray-500 md:text-2xl lg:text-3xl">
                {/* 주문일자 */}
                <p>{props.orderDate}</p>
                {/* 주문상태 */}
                <p>{props.orderState}</p>
            </div>
            {/* 음식명 */}
            <p className="mt-1 text-2xl font-bold lg:text-3xl xl:text-4xl">{props.foodName}</p>
            <div className="flex flex-row items-center justify-between mt-9">
                <div className="text-2xl font-bold md:text-3xl sm-size-flex">
                    <p className="text-gray-500 ">결제 금액</p>
                    <p className="text-red-500 ">{props.price} 원</p>
                </div>
                <button className="text-xl font-bold w-[100px] h-[100px] border-2 border-black rounded-[10px]">상세내역 보러가기</button>
            </div>
        </div>
    );
};

export default SalesList;