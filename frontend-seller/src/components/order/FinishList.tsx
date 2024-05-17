import React from "react";

type FinishInfo = {
  orderInfoId: number;
  orderNo: string;
  orderContents: string;
  orderPrice: number;
  orderStatus: string;
  orderDate: string;
}
const FinishList: React.FC<FinishInfo> = (props) => {
  return (
    <div>
      <h1>{props.orderContents}</h1>
      <h1>{props.orderDate}</h1>
      <h1>{props.orderInfoId}</h1>
      <h1>{props.orderNo}</h1>
      <h1>{props.orderPrice}</h1>
      <h1>{props.orderStatus}</h1>
    </div>
  );
};

export default FinishList;