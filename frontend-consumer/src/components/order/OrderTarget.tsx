import { useNavigate } from "react-router-dom";
import OrderDetailButton from "../button/OrderDetailButton";
import CallButton from "../button/CallButton";
import { OrderInfo } from "../../types/OrderType";

interface OrderInfoProps {
  orderData: OrderInfo;
}

const Ordertarget = ({ orderData }: OrderInfoProps) => {
  const navigate = useNavigate();
  const handleMoveSubmit = () => {
    if (
      orderData.orderStatus === "수령 완료" ||
      orderData.orderStatus === "거절됨" ||
      orderData.orderStatus === "취소됨"
    ) {
      return;
    } else {
      navigate(`/order-state`, {
        state: { orderInfoId: orderData.orderInfoId },
      });
    }
  };

  return (
    <div className="w-screen px-2">
      <div className="mb-2 border-2 rounded-xl">
        <div className="px-4 pt-2 text-xs font-bold text-gray-400 between">
          <p>{orderData.orderDate}</p>
          <p>{orderData.orderStatus}</p>
        </div>
        <div className="py-2 pl-4 font-bold">
          <h1 className="text-lg">{orderData.storeName}</h1>
          <div className="flex items-center text-gray-400 text-sm">
            <p className="">{orderData.orderContents}</p>
            <p className="ml-2 text-red-500">{orderData.orderPrice}원</p>
          </div>
        </div>
        <div className="mx-4 mb-2 between">
          <CallButton storeTel={String(orderData.storeTel)} />
          {orderData.orderStatus === "수령 완료" ||
          orderData.orderStatus === "거절됨" ||
          orderData.orderStatus === "취소됨" ? (
            <div>
              <OrderDetailButton orderInfoId={orderData.orderInfoId} />
            </div>
          ) : (
            <button
              onClick={handleMoveSubmit}
              className="order-detail-button"
            >{`주문현황 보러가기 >`}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ordertarget;
