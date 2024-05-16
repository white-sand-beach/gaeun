import React from "react";
import { OrderInfoType } from "../../types/order/OrderInfoType";

type inprogressProps = {
  inprogressOrderInfo: OrderInfoType[];
};

const InprogressList: React.FC<inprogressProps> = (props) => {
  return (
    <div className="flex flex-col w-full gap-3">
      {props.inprogressOrderInfo.map((inprogress) => (
        <div
          key={inprogress.orderInfoId}
          className="w-full h-[300px] border-2 p-2"
        >
          <div className="flex flex-row justify-between">
            <p>주문번호 : {inprogress.orderInfoId}</p>
            <div>
              <p>{inprogress.orderDate}</p>
              <p>{inprogress.orderStatus}</p>
            </div>
          </div>
          <p>{inprogress.orderContents}</p>
          <p>{inprogress.consumerPhoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default InprogressList;
