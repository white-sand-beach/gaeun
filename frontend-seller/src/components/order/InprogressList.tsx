import React, { useState } from "react";
import { OrderInfoType } from "../../types/order/OrderInfoType";
import { useNavigate } from "react-router-dom";

type inprogressProps = {
  inprogressOrderInfo: OrderInfoType[];
};

const InprogressList: React.FC<inprogressProps> = (props) => {
  const navigate = useNavigate();
  const [searchOrderNo, setSearchOrderNo] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOrderNo(e.target.value);
  };

  const filterOrderNo = props.inprogressOrderInfo.filter((orderInfo) =>
    orderInfo.orderNo.includes(searchOrderNo)
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <input
        type="text"
        className="border-4 rounded-[20px] h-[50px] p-2 mx-2"
        placeholder="주문번호를 입력해주세요"
        value={searchOrderNo}
        onChange={handleInputChange}
      />
      {filterOrderNo.map((inprogress) => (
        <div
          key={inprogress.orderInfoId}
          className="h-[300px] border-4 p-2 rounded-[20px] mx-2 font-bold text-xl"
        >
          <div className="flex flex-row justify-between">
            <p>주문번호 : {inprogress.orderNo}</p>
            <div>
              <p>{inprogress.orderDate}</p>
              <p>{inprogress.orderStatus}</p>
            </div>
          </div>
          <p>{inprogress.orderContents}</p>
          <p>{inprogress.consumerPhoneNumber}</p>
          <button
            className="border-2 border-black rounded-[10px] flex flex-row justify-center items-center p-2"
            onClick={() => navigate(`/order/${inprogress.orderInfoId}`)}
          >
            상세내역 보러가기
          </button>
        </div>
      ))}
    </div>
  );
};

export default InprogressList;
