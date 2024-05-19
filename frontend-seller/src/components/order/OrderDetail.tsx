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
        <div className="w-full max-w-8xl p-6 bg-white rounded-lg shadow-md">
          {/* 현재 결제 상태에 따라 노출될 버튼들 */}
          {/* status가 PAID (결제 완료) 상태일 때 */}
          {detailInfo.orderStatus === "결제 완료" && (
            <div className="flex flex-row gap-6 justify-between">
              <p className="text-[40px] font-bold">
                주문이 들어왔어요! 수락 버튼을 눌러 보세요!
              </p>
              <div>
                {/* 준비 할게요 */}
                <button
                  className="bg-mainColor text-[30px] py-2 px-8 mr-4 text-white rounded-lg hover:bg-orange-400"
                  onClick={() => handleStatusChange("IN_PROGRESS", 30)}
                >
                  수락
                </button>
                {/* 거절 할게요 */}
                <button
                  className="bg-white py-2 px-8 text-mainColor border-mainColor text-[30px] border-4 rounded-lg hover:bg-orange-400 hover:text-white"
                  onClick={() => handleStatusChange("DENIED")}
                >
                  거절
                </button>
              </div>
            </div>
          )}

          {/* status가 IN_PROGRESS (진행 중) 상태일 때 */}
          {detailInfo.orderStatus === "진행 중" && (
            <div className="flex flex-row gap-6 justify-between">
              <p className="text-[40px] font-bold">
                음식 준비가 완료되면 준비 완료 버튼을 눌러보세요!
              </p>
              <div>
                {/* 준비 다 했어요 */}
                <button
                  className="bg-mainColor text-[30px] py-2 px-8 mr-4 text-white rounded-lg hover:bg-orange-400"
                  onClick={() => handleStatusChange("PREPARED")}
                >
                  준비 완료
                </button>
                {/* 취소 할게요 */}
                <button
                  className="bg-white py-2 px-8 text-mainColor border-mainColor text-[30px] border-4 rounded-lg hover:bg-orange-400 hover:text-white"
                  onClick={() => handleStatusChange("CANCEL")}
                >
                  취소
                </button>
              </div>
            </div>
          )}
          {/* status가 PREPARED (준비 완료) 상태일 때 */}
          {detailInfo.orderStatus === "준비 완료" && (
            // 손님이 가져갔어요
            <div className="flex justify-between items-center">
              <p className="text-[40px] font-bold">
                손님이 음식을 수령해 가면 판매 완료 버튼을 눌러주세요!
              </p>
              <button
                className="bg-mainColor text-[30px] py-2 px-8 mr-4 text-white rounded-lg hover:bg-orange-400"
                onClick={() => handleStatusChange("FINISHED")}
              >
                판매 완료
              </button>
            </div>
          )}
          <hr className="border-2 my-2" />
          <div className="flex justify-between">
          <h1 className="mb-6 mt-4 text-[40px] font-bold">
            {detailInfo.orderItems[0].name}
          </h1>
          {detailInfo.orderStatus === "진행 중" && (
            <div className="flex flex-row font-bold justify-end text-[30px]">
              <p className="pr-4">남은 예상 시간</p>
              <p>{detailInfo.restTime}분</p>
            </div>
          )}
          </div>
          <p className="font-bold text-[30px] text-blue-500">
            {detailInfo.orderStatus}
          </p>
          <div className="flex justify-between mt-2">
            <p className="font-bold text-[30px]">주문 시간</p>
            <p className="text-[20px]">{detailInfo.orderDate}</p>
          </div>
          <div className="flex justify-between mt-4">
            <p className="font-bold text-[30px]">주문 번호</p>
            <p>{detailInfo.orderNo}</p>
          </div>
          <div className="pt-8 mt-2 border-t border-gray-300">
            <p className="mb-4 font-bold text-[30px]">주문 내역</p>
            <div className="flex justify-between text-[30px] font-bold">
              <p>{`${detailInfo.orderItems[0].name} ${detailInfo.orderItems[0].quantity}개`}</p>
              <p>{detailInfo.orderItems[0].sellPrice.toLocaleString()}원</p>
            </div>
          </div>
          <div className="pt-8 mt-2 border-t border-gray-300 text-[30px]">
            <p className="mb-4 font-bold">결제 내역</p>
            <div className="flex flex-col font-bold">
              <div className="flex justify-between">
                <p>주문금액</p>
                <p>{detailInfo.originalPrice.toLocaleString()}원</p>
              </div>
              <div className="flex justify-between">
                <p>할인금액</p>
                <p>{detailInfo.discountPrice.toLocaleString()}원</p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <p className="font-bold">총 결제금액</p>
              <p className="text-lg text-[30px] font-bold text-blue-500">
                {detailInfo.paymentPrice.toLocaleString()}원
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
