import OrderDetailButton from "../button/OrderDetailButton";
import CallButton from "../button/CallButton";
import { OrderInfo } from "../../types/OrderType";

interface OrderInfoProps {
  orderData: OrderInfo;
}

const Ordertarget = ({ orderData }: OrderInfoProps) => {
  return (
    <div className="w-screen px-2">
      <div className="mb-2 border-2 rounded-xl">
        <div className="px-4 pt-2 text-xs font-bold text-gray-400 between">
          <p>{orderData.orderDate}</p>
          <p className="text-xxs">{orderData.orderStatus}</p>
        </div>
        <div className="items-center py-2 pl-4 font-bold">
          <h1>{orderData.storeName}</h1>
          <div className="flex items-center text-gray-400 text-xxs">
            <p className="">{orderData.orderContents}</p>
            <p className="ml-2 text-red-500">{orderData.orderPrice}원</p>
          </div>
        </div>
        <div className="mx-4 mb-2 between">
          <CallButton storeTel={String(orderData.storeTel)} />
          <OrderDetailButton orderInfoId={orderData.orderInfoId} />
        </div>
      </div>
    </div>
  );
};

export default Ordertarget;
