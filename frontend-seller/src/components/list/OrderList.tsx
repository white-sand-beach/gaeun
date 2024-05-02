import React from "react";
import { Order } from "../../types/Order.ts";

const OrderList: React.FC<Order> = (props) => {
    return (
        <div className="flex flex-col justify-center border-2 p-4 rounded-[5px] shadow-lg gap-3 w-[320px] h-[240px] ">
            <div className="flex justify-between text-xl text-gray-500">
                {/* 주문번호 */}
                <p>{props.orderNum}</p>
                {/* 주문일자 */}
                <p>{props.orderNum}</p>
            </div>
            {/* 음식명 */}
            <p className="mt-1 text-2xl font-bold">{props.foodName}</p>
            <div className="flex flex-row items-center justify-between mt-9">
                <div className="flex flex-col items-center text-xl font-bold">
                    <p className="text-gray-500 ">결제 금액</p>
                    <p className="text-red-500 ">{props.price} 원</p>
                </div>
                <button className="text-xl font-bold w-[100px] h-[100px] border-2 border-black rounded-[10px]">상세내역 보러가기</button>
            </div>
        </div>
    );
};

export default OrderList;