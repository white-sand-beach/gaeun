import React from "react";
import { OrderType } from "@/types/OrderType.ts";

const NotificationList: React.FC<OrderType> = (props) => {
    return (
        <div className="flex flex-col justify-around w-screen h-[160px] border-b-2 p-3">
            {/* 주문번호 및 주문날짜 */}
            <div className="flex flex-row justify-between w-full">
                <p className="text-gray-500 ">{props.orderNum}</p>
                <p className="text-gray-500">{props.orderDate}</p>
            </div>

            <div className="flex flex-row items-center justify-between w-full mt-3">
                <div className="flex flex-col">
                    {/* 음식명 */}
                    <p className="mt-1 font-bold text-[20px]">{props.foodName}</p>

                    {/* 결제 금액 */}
                    <div className="flex flex-row justify-between w-[140px] font-bold text-[14px]">
                        <p>결제 금액</p>
                        <p className="text-red-500">{props.price}원</p>
                    </div>
                </div>
                {/* 상세내역 보러가기 */}
                <button className="text-[14px] w-[160px] md:w-[200px] border-2 border-[#A3A3A3] p-2 rounded-lg font-bold">상세내역 보러가기</button>
            </div>
        </div>
    );
};

export default NotificationList;