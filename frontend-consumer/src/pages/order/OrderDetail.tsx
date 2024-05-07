import OrderDetailInfo from "@/components/order/OrderDetailInfo";
import PaymentHistory from "@/components/order/PaymentHistory";
import ReorderButton from "@/components/button/ReorderButton";
import ReviewButton from "@/components/button/ReviewButton";
import OrderDeleteButton from "@/components/button/OrderDeleteButton";

const OrderDetail = () => {
  return (
    <div className="flex justify-center pt-14 mb-10">
      <div>
        {/* 가게명 및 주문 정보 */}
        <OrderDetailInfo />
        {/* 주문 내역 */}
        <div className="center">
          <div className="w-[300px] border-[1px] border-gray-300 rounded-lg text-xs font-bold mx-6 p-2">
            <h1 className="ml-2">주문 내역</h1>
            <hr className="my-2" />
            <div className="between mx-2">
              <p>메뉴명 (아주 맛있는 것)</p>
              <p>13,900원</p>
            </div>
          </div>
        </div>

        {/* 결제 내역 */}
        <div className="center">
          <PaymentHistory />
        </div>

        {/* 재주문 및 리뷰 작성 버튼 */}
        <div className="between mt-4 mx-7">
          <ReorderButton />
          <ReviewButton />
        </div>
        <div className="center">
          <OrderDeleteButton />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
