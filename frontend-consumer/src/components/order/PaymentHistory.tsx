import { OrderDetailType } from "../../types/OrderType";

interface OrderDetailProps {
  orderDetail: OrderDetailType
}

const PaymentHistory = ({ orderDetail }: OrderDetailProps) => {
  return (
    <div className="w-full border-[1px] border-gray-600 rounded-lg text-xs font-bold mt-4 mx-4 p-2 pt-3">
      <h1 className="ml-2">결제 내역</h1>
      <hr className="mt-3" />

      <div className="my-4 mx-2 font-medium text-gray-400">
        <div className="between">
          <p>주문 금액</p>
          <p>{orderDetail.originalPrice}원</p>
        </div>
        <div className="between">
          <p>할인 금액</p>
          <p>{orderDetail.discountPrice}원</p>
        </div>
      </div>
      <hr />

      <div className="my-3">
        <div className="between mx-2 font-bold">
          <p>총 결제 금액</p>
          <p>{orderDetail.paymentPrice}원</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
