import { useState, useEffect } from "react";
import { CartInfo } from "../../types/CartType"
import OrderPostForm from "../../services/orders/OrderPostService";
import * as PortOne from "@portone/browser-sdk/v2"

interface CheckPaymentProps {
  cartInfo: CartInfo;
}

const PaymentButton = ({ cartInfo }: CheckPaymentProps) => {
  const formattedSellPrice = new Intl.NumberFormat('ko-KR').format(cartInfo.sellTotalPrice);
  const [orderInfoId, setOrderInfoId] = useState<number>(0)

  const handlePaymentClick = async () => {
    if (cartInfo.isOpened) {
      try {
        const response = await OrderPostForm();
        setOrderInfoId(response.orderInfoId)
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const processPayment = async () => {
      if (orderInfoId !== 0) {
        try {
          const response = await PortOne.requestPayment({
            storeId: import.meta.env.VITE_STORE_ID,
            channelKey: import.meta.env.VITE_CHANNEL_KEY,
            paymentId: `payment-${crypto.randomUUID()}`,
            orderName: "가은",
            totalAmount: cartInfo.sellTotalPrice,
            currency: "CURRENCY_KRW",
            payMethod: "CARD",
            redirectUrl: `${window.location.origin}/payment/callback`,
            
          });
          console.log(response);
          alert("결제 화면으로 이동합니다.");
        } catch (error) {
          console.error(error);
        }
      }
    };

    processPayment();
  }, [orderInfoId, cartInfo.sellTotalPrice]);

  return (
    <button className={`footer-button w-[300px] ${!cartInfo.isOpened ? 'bg-gray-300' : 'bg-myColor'}`} onClick={handlePaymentClick} disabled={!cartInfo.isOpened}>{formattedSellPrice}원 결제하기</button>
  );
};

export default PaymentButton;
