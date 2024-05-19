import React from "react";
import { useNavigate } from "react-router-dom";

type FinishInfo = {
  orderInfoId: number;
  orderNo: string;
  orderContents: string;
  orderPrice: number;
  orderStatus: string;
  orderDate: string;
};

const FinishList: React.FC<FinishInfo> = (props) => {
  const navigate = useNavigate()
  return (
    <div className="h-[300px] border-4 p-2 rounded-[20px] mx-2 font-bold text-xl w-screen">
      <div className="flex flex-row justify-between">
        <p>주문번호 : {props.orderNo}</p>
        <div>
          <p>{props.orderDate}</p>
          <p>{props.orderStatus}</p>
        </div>
      </div>
      <p>{props.orderContents}</p>
      <button
        className="border-2 border-black rounded-[10px] flex flex-row justify-center items-center p-2"
        onClick={() => navigate(`/order/${props.orderInfoId}`)}
      >
        상세내역 보러가기
      </button>
    </div>
  );
};

export default FinishList;
