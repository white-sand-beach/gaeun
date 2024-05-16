import React from "react";
import { OrderInfoType } from "../../types/order/OrderInfoType";

type inprogressProps = {
    inprogressOrderInfo: OrderInfoType[]
}
const InprogressList: React.FC<inprogressProps> = (props) => {
    return (
        <div className="flex flex-col w-full gap-3">
            {props.inprogressOrderInfo.map((inprogress) => (
                <div key={inprogress.orderInfoId} className="w-full h-[400px]">
                    <p>{inprogress.orderDate}</p>
                    <p>{inprogress.orderInfoId}</p>
                </div>
            ))}
        </div>
    );
};

export default InprogressList;