import { CartInfo } from "../../types/CartType"

interface CheckPaymentProps {
  cartInfo: CartInfo;
}

const PaymentButton = ({ cartInfo }: CheckPaymentProps) => {
  const formattedSellPricePrice = new Intl.NumberFormat('ko-KR').format(cartInfo.sellTotalPrice);
  const buttonClass = `footer-button w-[300px] fixed bottom-10 ${!cartInfo.isOpened ? 'bg-gray-300' : 'bg-myColor'}`;

  return (
    <button className={buttonClass} disabled={!cartInfo.isOpened}>{formattedSellPricePrice}원 결제하기</button>
  );
};

export default PaymentButton;
