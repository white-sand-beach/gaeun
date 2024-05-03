import React from "react";
import { OrderType } from "../../types/OrderType.ts";

const OrderList: React.FC<OrderType> = (props) => {
    return (
        <div className="w-screen list-component xl:xl-size-list">
            <div className="flex justify-between text-xl text-gray-500">
                {/* 주문번호 */}
                <p>주문번호 : {props.orderNum}</p>
                {/* 주문일자 */}
                <p>{props.orderNum}</p>
            </div>
            {/* 음식명 */}
            <p className="mt-1 text-2xl font-bold">{props.foodName}</p>
            <div className="flex flex-row items-center justify-between mt-9">
                <div className="text-2xl font-bold">
                    <p className="text-gray-500 ">결제 금액</p>
                    <p className="text-red-500 ">{props.price} 원</p>
                </div>
                <button className="text-xl font-bold w-[100px] h-[100px] border-2 border-black rounded-[10px]">상세내역 보러가기</button>
            </div>
        </div>
    );
};

export default OrderList;