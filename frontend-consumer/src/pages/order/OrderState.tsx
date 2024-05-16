import { useLocation } from "react-router-dom";
import CallButton from "../../components/button/CallButton";
import OrderDetailButton from "../../components/button/OrderDetailButton";
import OrderCurrentGetForm from "../../services/orders/OrderCurrentGetService";
import { useEffect, useState } from "react";
import { OrderCurrentState } from "../../types/OrderType";
import KakaoMap from "../main/Kakaomap";
import BannerSlider from "../../components/navbar/ServiceBanner";
import OrderDeleteForm from "../../services/orders/OrderDeleteService";

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

  const handleDeleteSubmit = async () => {
    const userConfirmed = confirm("주문을 정말 취소하시겠습니까?");
  if (userConfirmed) {
    try {
      await OrderDeleteForm(String(50));
      console.log("주문 취소 성공");
    } catch (error) {
      console.error("주문 취소 실패", error);
    }
  } else {
    console.log("주문 취소를 취소함.");
  }
  };

  return (
    <div className="pt-16">
      <header className="between mx-4 mt-2">
        <p className="text- font-bold ml-1">{orderCurrent.orderStatus}</p>
        {orderCurrent.orderContents == null ? (
          <div className="p-2 text-xxs text-white rounded-lg bg-myColor font- bold">
            {orderCurrent.orderRestTime}
          </div>
        ) : (
          <button
            onClick={handleDeleteSubmit}
            className="p-2 text-xxs text-white rounded-lg bg-myColor font- bold"
          >
            주문 취소
          </button>
        )}
      </header>

      <div className="center my-2">
        <div className="w-full mx-4 border-2 rounded-lg text-gray-400 font-bold px-4 pb-4">
          <div className="between text-black text-sm py-2">
            <p>주문 시간</p>
            <p>{orderCurrent.orderDate}</p>
          </div>
          <hr className="mb-2" />
          <div className="text-xl text-black">
            <p>{orderCurrent.storeName}</p>
            <p className="text-sm">{orderCurrent.orderContents}</p>
          </div>
          <p className="my-2 font-normal text-xs">
            가게가 마감하기 전에 반드시 픽업해주세요!
          </p>
          <div className="center justify-between">
            <div className="flex items-center mt-1">
              <CallButton storeTel={orderCurrent.storeTel} />
            </div>
            <OrderDetailButton orderInfoId={orderCurrent.orderInfoId} />
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto mb-4 border-2 border-orange-400 center h-14 rounded-xl">
        <BannerSlider />
      </div>
      <div className="border-2 m-4 rounded-lg p-2 text-xs">
        <p className="font-bold text-sm pb-1">가게 주소</p>
        <p>도로명 주소: {orderCurrent.storeRoadAddress}</p>
        <p>지번 주소: {orderCurrent.storeAddress}</p>
      </div>
      <div>
        <KakaoMap
          lat={orderCurrent.storeLatitude}
          lng={orderCurrent.storeLongitude}
          updateCounter={0}
          height={"300px"}
          isShop={true}
        />
      </div>
    </div>
  );
};

export default OrderState;
