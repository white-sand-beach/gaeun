import React from "react";
import { Order } from "../../types/Order.ts";

const OrderList: React.FC<Order> = (props) => {
    return (
        <div className="flex flex-col w-full h-[240px] justify-center border-2 p-4 rounded-[5px] shadow-lg gap-3">
            <div className="flex justify-between">
                {/* 주문번호 */}
                <p className="text-2xl text-gray-500">{props.orderNum}</p>
                {/* 주문일자 */}
                <p className="text-2xl text-gray-500">{props.orderNum}</p>
            </div>
            {/* 음식명 */}
            <p className="mt-1 text-4xl font-bold">{props.foodName}</p>
            <div className="flex flex-row justify-between mt-9">
                <div className="flex flex-row justify-between items-center w-[280px]">
                    <p className="text-2xl text-gray-500">결제 금액</p>
                    <p className="text-3xl font-bold text-red-500">{props.price} 원</p>
                </div>
                <button className="text-xl font-bold w-[240px] h-[60px] border-2 border-black rounded-[10px]">{"상세내역 보러가기 >"}</button>
            </div>
        </div>
    );
};

export default OrderList;