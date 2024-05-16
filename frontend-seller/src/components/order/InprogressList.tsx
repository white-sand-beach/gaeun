import React from "react";
import { InprogressOrderType } from "../../types/order/InprogressOrderType";

type OrderListType = {
    inprogressOrderInfo: InprogressOrderType[]
}
const InprogressList: React.FC<OrderListType> = (props) => {
    return (
        <div className="flex flex-col w-full gap-3">
            {props.inprogressOrderInfo.map((inprogress) => (
                <div key={inprogress.orderInfoId} className="flex flex-col w-full p-3 border-2 border-black rounded-lg">
                    <p>주문번호 : {inprogress.orderInfoId}</p>
                    <p>메뉴명 : {inprogress.orderContents}</p>
                    <p>가격 : {inprogress.orderPrice}</p>
                    <p>주문상태 : {inprogress.orderStatus}</p>
                    <p>주문날짜 : {inprogress.orderDate}</p>
                    <p>손님번호 : {inprogress.consumerPhoneNumber}</p>
                </div>
            ))}
        </div>
    );
};

export default InprogressList;