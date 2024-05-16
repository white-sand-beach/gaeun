import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { OrderItem, OrderDetailType } from "../../types/OrderType";
import PaymentHistory from "../../components/order/PaymentHistory";
import ReorderButton from "../../components/button/ReorderButton";
import ReviewButton from "../../components/button/ReviewButton";
import BannerSlider from "../../components/navbar/ServiceBanner";

const OrderDetail = () => {
  const location = useLocation();
  const { orderDetail } = location.state as { orderDetail: OrderDetailType };

  useEffect(() => {
    console.log(orderDetail);
  });

  return (
    <div className="center w-screen h-screen">
      <div className="">
        {/* 가게명 및 주문 정보 */}
        <div className="pt-2 mx-6 mb-2">
          <h1 className="font-bold text-2xl">{orderDetail.storeName}</h1>
          <p className="mt-2 text-sm font-bold">주문 정보</p>
          <div className="mt-2 text-xs text-gray-400 ">
            <div className="between">
              <p>주문 상태</p>
              <p>{orderDetail.orderStatus}</p>
            </div>
            <div className="between">
              <p>주문 시간</p>
              <p>{orderDetail.orderDate}</p>
            </div>
            <div className="between">
              <p>주문 번호</p>
              <p className="text-xxs">{orderDetail.orderNo}</p>
            </div>
          </div>
        </div>
        {/* 주문 내역 */}
        <div className="between mx-4 pt-2">
          <div className="w-full border-[1px] border-gray-300 rounded-lg text-xs font-bold mx- p-2">
            <h1 className="ml-2">주문 내역</h1>
            <hr className="my-2" />
            {orderDetail.orderItems &&
              orderDetail.orderItems.map((item: OrderItem, index: number) => (
                <div key={index} className="between mx-2 my-1">
                  <p>
                    {item.name} {item.quantity}개
                  </p>
                  <p>{`${item.sellPrice}원`}</p>
                </div>
              ))}
          </div>
        </div>

        {/* 결제 내역 */}
        <div className="center">
          <PaymentHistory orderDetail={orderDetail} />
        </div>
        <div className="w-11/12 mx-auto mt-6 mb-4 border-2 border-orange-400 center h-14 rounded-xl">
          <BannerSlider />
        </div>
        {/* 재주문 및 리뷰 작성 버튼 */}
        <div className="between mt-8 mx-4">
          <ReorderButton storeId={orderDetail.storeId} />
          <ReviewButton />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
