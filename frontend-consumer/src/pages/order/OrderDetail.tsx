import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LetterRegistraionModal from "../../components/letter/LetterRegistration";

import { OrderItem, OrderDetailType } from "../../types/OrderType";
import PaymentHistory from "../../components/order/PaymentHistory";

import ReviewButton from "../../components/button/ReviewButton";
import BannerSlider from "../../components/navbar/ServiceBanner";

import ProfileForm from "../../services/accounts/ProfileInformation";
import useUserStore from "../../store/UserStore";

const OrderDetail = () => {
  const location = useLocation();
  const { orderDetail } = location.state as { orderDetail: OrderDetailType };
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProfileForm();
        const userState = useUserStore.getState();
        userState.updateUserState?.("nickname", data.nickname);
        console.log("프로필정보 요청성공");
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 넣어서 컴포넌트 마운트 시에만 호출되도록 함

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    navigate(`/shop/${orderDetail.storeId}`);
  };

  useEffect(() => {
    console.log(orderDetail);
    console.log(orderDetail.reviewId);
  });

  return (
    <div className="w-screen h-screen center">
      <div className="">
        {/* 가게명 및 주문 정보 */}
        <div className="pt-2 mx-6 mb-2">
          <h1 onClick={handleSubmit} className="text-2xl font-bold">
            {orderDetail.storeName} &gt
          </h1>
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
        <div className="pt-2 mx-4 between">
          <div className="w-full border-[1px] border-gray-300 rounded-lg text-xs font-bold mx- p-2">
            <h1 className="ml-2">주문 내역</h1>
            <hr className="my-2" />
            {orderDetail.orderItems &&
              orderDetail.orderItems.map((item: OrderItem, index: number) => (
                <div key={index} className="mx-2 my-1 between">
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
        {/* 편지 작성 버튼 */}
        <div className="flex items-center justify-center h-14">
          {orderDetail.reviewId == null && (
            <div onClick={toggleModal}>
              <ReviewButton orderStatus={orderDetail.orderStatus} />
            </div>
          )}
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <LetterRegistraionModal
                onClose={closeModal}
                orderDetail={orderDetail}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
