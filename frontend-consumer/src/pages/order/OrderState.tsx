import { useLocation } from "react-router-dom";
import CallButton from "../../components/button/CallButton";
import OrderDetailButton from "../../components/button/OrderDetailButton";
import OrderCurrentGetForm from "../../services/orders/OrderCurrentGetService";
import { useEffect, useState } from "react";
import { OrderCurrentState } from "../../types/OrderType";

const OrderState = () => {
  const location = useLocation();
  const { orderInfoId } = location.state as { orderInfoId: string };
  const [orderCurrent, setOrderCurrent] = useState<OrderCurrentState>({
    orderInfoId: 0,
    orderDate: "",
    orderRestTime: 0,
    orderStatus: "",
    orderContents: "",
    storeId: 0,
    storeName: "",
    storeTel: "",
    storeAddress: "",
    storeRoadAddress: "",
    storeLatitude: 0,
    storeLongitude: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrderCurrentGetForm(orderInfoId);
        console.log("현황 조회 성공:", response);
        setOrderCurrent(response);
      } catch (error) {
        console.log("현황 조회 실패:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-16">
      <header className="between mx-4 mt-2">
        <p className="text-sm font-bold">사장님이 열심히 준비하는 중이에요!</p>
        <div className="p-2 text-xxs text-white rounded-lg bg-myColor font- bold">
          5분 남음
        </div>
      </header>

      <div className="center my-4">
        <div className="w-[300px] border-2 rounded-lg text-xxs text-gray-400 font-bold p-4">
          <div>
            <p className="text-lg text-black">{orderCurrent.storeName}</p>
          </div>

          <div className="my-2">
            <p>가게가 마감하기 전에 반드시 픽업해주세요!</p>
          </div>
          <div className="center justify-between">
            <div className="flex items-center mt-1">
              <CallButton />
            </div>
            <OrderDetailButton orderInfoId={orderCurrent.orderInfoId} />
          </div>
        </div>
      </div>
      {/* 지도 자리 */}
    </div>
  );
};

export default OrderState;
