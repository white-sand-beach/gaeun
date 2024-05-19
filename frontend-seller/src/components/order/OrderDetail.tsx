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
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 w-full">
      {detailInfo ? (
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-xl font-bold">
            {detailInfo.orderItems[0].name}
          </h1>
          <p className="font-bold text-blue-500">{detailInfo.orderStatus}</p>
          <div className="flex justify-between mt-4">
            <p className="font-bold">주문 시간</p>
            <p>{detailInfo.orderDate}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-bold">주문 번호</p>
            <p>{detailInfo.orderNo}</p>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-300">
            <p className="mb-2 font-bold">주문 내역</p>
            <div className="flex justify-between">
              <p>{`${detailInfo.orderItems[0].name} ${detailInfo.orderItems[0].quantity}개`}</p>
              <p>{detailInfo.orderItems[0].sellPrice}원</p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-300">
            <p className="mb-2 font-bold">결제 내역</p>
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <p>주문금액</p>
                <p>{detailInfo.originalPrice}원</p>
              </div>
              <div className="flex justify-between">
                <p>할인금액</p>
                <p>{detailInfo.discountPrice}원</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <p className="font-extrabold">총 결제금액</p>
              <p className="text-lg font-bold text-blue-500">
                {detailInfo.paymentPrice}원
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>주문 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default OrderDetail;
