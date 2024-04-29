// 내부 import
import React from "react";

// 외부 import
import { Order } from "../../types/Order.ts";

const OrderList: React.FC<Order> = (props) => {
    return (
        <div className="flex flex-col w-[400px] h-[180px] justify-center border-2 p-4 rounded-[5px] shadow-lg gap-3">
            <div className="flex justify-between">
                <p className="text-gray-500">{props.orderNum}</p>
                <p className="text-gray-500">{props.orderNum}</p>
            </div>
            <p className="mt-1 text-xl font-bold">{props.foodName}</p>
            <div className="flex flex-row justify-between mt-9">
                <div className="flex flex-row justify-between items-center w-[175px]">
                    <p className="text-gray-500 text-[16px]">결제 금액</p>
                    <p className="text-xl font-bold text-red-500">{props.price} 원</p>
                </div>
                <button className="text-[14px] font-bold w-[140px] h-[30px] border-2 border-black rounded-[5px]">{"상세내역 보러가기 >"}</button>
            </div>
        </div>
    );
};

export default OrderList;