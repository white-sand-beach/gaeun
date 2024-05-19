import { useLocation, useNavigate, Link } from "react-router-dom";
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
  const navigate = useNavigate();
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
        await OrderDeleteForm(String(orderCurrent.orderInfoId));
        console.log("주문 취소 성공");
        alert("주문이 취소되었습니다.");
        navigate("/order-list");
      } catch (error) {
        console.error("주문 취소 실패", error);
      }
    } else {
      console.log("주문 취소를 취소함.");
    }
  };

  return (
    <div className="pt-16">
      <header className="mx-4 mt-2 between">
        <p className="ml-1 font-bold text-">{orderCurrent.orderStatus}</p>
        {orderCurrent.orderStatus === "결제 완료" ? (
          <button
            onClick={handleDeleteSubmit}
            className="p-2 text-xs text-white rounded-lg bg-myColor font- bold"
          >
            주문 취소
          </button>
        ) : orderCurrent.orderStatus === "진행 중" ? (
          <div className="p-2 text-xs text-white rounded-lg bg-myColor font- bold">
            {orderCurrent.orderRestTime !== 0 ? (
              <div>{orderCurrent.orderRestTime}분 남음</div>
            ) : (
              <div>잠시만 기다려주세요</div>
            )}
          </div>
        ) : orderCurrent.orderStatus === "준비 완료" ? (
          <div className="p-2 text-xs text-white rounded-lg bg-myColor font- bold">
            음식이 준비되었습니다.
          </div>
        ) : null}
      </header>

      <div className="my-2 center">
        <div className="w-full px-4 pb-4 mx-4 font-bold text-gray-400 border-2 rounded-lg">
          <div className="py-2 text-sm text-black between">
            <p>주문 시간</p>
            <p>{orderCurrent.orderDate}</p>
          </div>
          <hr className="mb-2" />
          <div className="text-xl text-black">
            <Link to={`/shop/${orderCurrent.storeId}`}>
              <p>
                {orderCurrent.storeName}
                {" >"}
              </p>
            </Link>
            <p className="text-sm">{orderCurrent.orderContents}</p>
          </div>
          <p className="my-2 text-xs font-normal">
            가게가 마감하기 전에 반드시 픽업해주세요!
          </p>
          <div className="justify-between center">
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
      <div className="p-2 m-4 text-xs border-2 rounded-lg">
        <p className="pb-1 text-sm font-bold">가게 주소</p>
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
