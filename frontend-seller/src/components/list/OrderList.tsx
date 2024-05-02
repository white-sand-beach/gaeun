import React from "react";
import { Order } from "../../types/Order.ts";

const OrderList: React.FC<Order> = (props) => {
    return (
        <div className="list-component normal-size-list sm:sm-size-list md:md-size-list lg:lg-size-list xl:xl-size-list">
            <div className="flex justify-between text-xl text-gray-500 md:text-2xl lg:text-3xl">
                {/* 주문번호 */}
                <p>주문번호 : {props.orderNum}</p>
                {/* 주문일자 */}
                <p>{props.orderNum}</p>
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

export default OrderList;