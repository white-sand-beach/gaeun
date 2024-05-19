import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailOrderInfoType } from "../../types/order/DetailOrderInfoType";
import DetailOrderInfo from "../../service/order/DetailOrderInfo";
import OrderStatusAPI from "../../service/order/OrderStatusAPI";

const OrderDetail: React.FC = () => {
  const { orderInfoId } = useParams<{ orderInfoId: string }>();
  const [detailInfo, setDetailInfo] = useState<DetailOrderInfoType | null>(
    null
  );

  // 상세 정보 업데이트
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
  }, [orderInfoId, detailInfo]);

  const handleStatusChange = async (newStatus: string, restTime?: number) => {
    // 상세 정보 없으면 XX
    if (!detailInfo) return;

    // 요청한 상태에 따라 표시할 status 맵핑
    const statusDisplayMap: { [key: string]: string } = {
      IN_PROGRESS: "진행 중",
      PREPARED: "준비 완료",
      FINISHED: "수령 완료",
      DENIED: "거절됨",
      CANCEL: "취소됨",
    };

    try {
      await OrderStatusAPI(detailInfo.orderInfoId, newStatus, restTime);
      setDetailInfo({
        ...detailInfo,
        orderStatus: statusDisplayMap[newStatus],
        restTime: restTime || detailInfo.restTime,
      });
    } catch (err) {
      console.error(err);
    }
  };

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
            {detailInfo.orderStatus === "진행 중" ? (
              <div className="flex flex-row justify-between">
                <p>남은 시간</p>
                <p>{detailInfo.restTime}분</p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* 현재 결제 상태에 따라 노출될 버튼들 */}

          {/* status가 PAID (결제 완료) 상태일 때 */}
          {detailInfo.orderStatus === "결제 완료" && (
            <div className="flex flex-row gap-3">
              {/* 준비 할게요 */}
              <button onClick={() => handleStatusChange("IN_PROGRESS", 30)}>
                준비할게요
              </button>
              {/* 거절 할게요 */}
              <button onClick={() => handleStatusChange("DENIED")}>거절</button>
            </div>
          )}

          {/* status가 IN_PROGRESS (진행 중) 상태일 때 */}
          {detailInfo.orderStatus === "진행 중" && (
            <div className="flex flex-row gap-3">
              {/* 준비 다 했어요 */}
              <button onClick={() => handleStatusChange("PREPARED")}>
                준비 다 햇어요
              </button>
              {/* 취소 할게요 */}
              <button onClick={() => handleStatusChange("CANCEL")}>취소</button>
            </div>
          )}
          {/* status가 PREPARED (준비 완료) 상태일 때 */}
          {detailInfo.orderStatus === "준비 완료" && (
            // 손님이 가져갔어요
            <button onClick={() => handleStatusChange("FINISHED")}>
              수령 완료 처리
            </button>
          )}
        </div>
      ) : (
        <p>주문 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default OrderDetail;
