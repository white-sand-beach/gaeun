import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailOrderInfoType } from "../../types/order/DetailOrderInfoType";
import DetailOrderInfo from "../../service/order/DetailOrderInfo";

const OrderDetail: React.FC = () => {
  const { orderInfoId } = useParams<{ orderInfoId: string }>();
  const [detailInfo, setDetailInfo] = useState<DetailOrderInfoType | null>(
    null
  );

  useEffect(() => {
    const fetchInfoData = async () => {
      try {
        if (!orderInfoId) return; // orderInfoId 없으면 중단
        const response = await DetailOrderInfo(orderInfoId);
        setDetailInfo(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInfoData();
  }, [orderInfoId]);

  useEffect(() => {
    console.log(orderInfoId);
    console.log(detailInfo);
  }, [orderInfoId, detailInfo]);

  return (
    <div className="no-footer items-start px-4 gap-2">
      {/* 음식명 및 주문상태 */}
      <div className="flex flex-row justify-between w-full">
        <h1>{detailInfo?.orderItems[0].name}</h1>
        <p className="font-bold">{detailInfo?.orderStatus}</p>
      </div>

      <p className="text-xl font-bold">주문정보</p>
      <div className="flex flex-row justify-between w-full font-bold">
        <p>주문 시간</p>
        <p>{detailInfo?.orderDate}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-bold">
        <p>주문 번호</p>
        <p>{detailInfo?.orderNo}</p>
      </div>
      <div className="flex flex-col w-full font-bold border-2 p-2 rounded-[10px] mt-5">
        <p className="p-2 border-b-2">주문 내역</p>
        <div className="flex flex-row justify-between w-full p-2">
          <p>{detailInfo?.orderItems[0].name} {detailInfo?.orderItems[0].quantity}개</p>
          <p>{detailInfo?.orderItems[0].sellPrice}원</p>
        </div>
      </div>
      <div className="flex flex-col w-full font-bold border-2 border-black p-2 rounded-[10px] mt-5">
        <p className="p-2 border-b-2">결제 내역</p>
        <div className="flex flex-col justify-center border-b-2">
          <div className="flex flex-row justify-between p-2 text-gray-500">
            <p>주문금액</p>
            <p>{detailInfo?.originalPrice}원</p>
          </div>
          <div className="flex flex-row justify-between p-2 text-gray-500">
            <p>할인금액</p>
            <p>{detailInfo?.discountPrice}원</p>
          </div>
        </div>
        <div className="flex flex-col w-full font-extrabold">
          <div className="flex flex-row justify-between p-2">
            <p>총 결제금액</p>
            <p>{detailInfo?.paymentPrice}원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
