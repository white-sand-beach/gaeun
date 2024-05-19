import React, { useState } from "react";
import { OrderInfoType } from "../../types/order/OrderInfoType";
import { useNavigate } from "react-router-dom";
import phone from "../../assets/order/phone.png";

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

  const makePhoneCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handlePhoneClick = (inprogress: any) => {
    makePhoneCall(inprogress.consumerPhoneNumber);
  };

  return (
    <div className=" gap-4">
      <input
        type="text"
        className="border-4 w-full rounded-[20px] h-[50px] p-2 mb-4"
        placeholder="주문번호를 입력해주세요"
        value={searchOrderNo}
        onChange={handleInputChange}
      />
      {filterOrderNo.map((inprogress) => (
        <div
          key={inprogress.orderInfoId}
          className="w-full border-4 p-2 rounded-[20px] bg-white font-bold text-xl"
        >
          <p className="mx-6 my-2">{inprogress.orderDate}</p>
          <hr className="my-2 mx-8 border-gray-400" />
          <div className="flex flex-row mx-6 justify-between">
            <p className="text-base">주문번호: {inprogress.orderNo}</p>
            <div>
              <p>{inprogress.orderStatus}</p>
            </div>
          </div>
          <div className="mx-6 mt-4">
            <p className="text-[30px] text-blue-600">
              {inprogress.orderContents}
            </p>
          </div>
          <div className="flex justify-between items-center mx-6">
            <div
               onClick={() => handlePhoneClick(inprogress)}
              className="flex items-center pt-2"
            >
              <img className="mr-2" src={phone} alt="" />
              <p className="text-gray-500">고객 전화</p>
            </div>
            <button
              className="border border-gray-400 text-gray-600 rounded-[10px] flex flex-row justify-center items-center p-2"
              onClick={() => navigate(`/order/${inprogress.orderInfoId}`)}
            >
              {`상세내역 보러가기 >`}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InprogressList;
