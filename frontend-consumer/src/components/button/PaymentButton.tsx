import { useState, useEffect } from "react";
import { CartInfo } from "../../types/CartType";
import OrderPostForm from "../../services/orders/OrderPostService";
import * as PortOne from "@portone/browser-sdk/v2";

const generateRandomId = (length: any) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

interface CheckPaymentProps {
  cartInfo: CartInfo;
}

const PaymentButton = ({ cartInfo }: CheckPaymentProps) => {
  const formattedSellPrice = new Intl.NumberFormat("ko-KR").format(
    cartInfo.sellTotalPrice
  );
  const [orderInfoId, setOrderInfoId] = useState<number>(0);
  const [consumerNickname, setCustomerNickName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState<string>("");

  const handlePaymentClick = async () => {
    if (cartInfo.isOpened) {
      try {
        const response = await OrderPostForm();
        setOrderInfoId(response.orderInfoId);
        setCustomerNickName(response.consumerNickname);
        setCustomerEmail(response.customerEmail);
        setCustomerPhoneNumber(response.customerPhoneNumber);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const processPayment = async () => {
      if (orderInfoId !== 0) {
        console.log(orderInfoId);
        // confirm 대화상자를 사용하여 사용자의 결정을 받습니다.
        const isConfirmed = confirm(
          "결제 후 마감 시간 전까지 매장 방문을 하지 않으시면 결제 금액은 사회에 환원됩니다. 결제를 진행하시겠습니까?"
        );
  
        if (isConfirmed) {
          // 사용자가 "확인"을 클릭한 경우, 결제 과정을 계속 진행합니다.
          try {
            const paymentId = `payment-${generateRandomId(30)}`;
            const redirectUrl = `${window.location.origin}/consumer/payment-callback?orderInfoId=${orderInfoId}&paymentId=${paymentId}`;
            const response = await PortOne.requestPayment({
              storeId: import.meta.env.VITE_STORE_ID,
              channelKey: import.meta.env.VITE_CHANNEL_KEY,
              paymentId: paymentId,
              orderName: "가은",
              totalAmount: cartInfo.sellTotalPrice,
              currency: "CURRENCY_KRW",
              payMethod: "CARD",
              redirectUrl: redirectUrl,
              customer: {
                fullName: consumerNickname,
                email: customerEmail || "example@email.com",
                phoneNumber: customerPhoneNumber || "010-1234-5678",
              },
            });
            window.location.href = redirectUrl;
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        } else {
          // 사용자가 "취소"를 클릭한 경우, 결제 과정을 취소합니다.
          console.log("결제가 취소되었습니다.");
          alert("결제가 취소되었습니다.")
        }
      }
    };
  
    processPayment();
  }, [orderInfoId]);
  return (
    <button
      className={`footer-button w-[300px] ${!cartInfo.isOpened ? "bg-gray-300" : "bg-myColor"}`}
      onClick={handlePaymentClick}
      disabled={!cartInfo.isOpened}
    >
      {formattedSellPrice}원 결제하기
    </button>
  );
};

export default PaymentButton;
