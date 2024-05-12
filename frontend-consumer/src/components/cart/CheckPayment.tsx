import { CartInfo } from "../../types/CartType"

interface CheckPaymentProps {
  cartInfo: CartInfo;
}

const CheckPayment = ({ cartInfo }: CheckPaymentProps) => {
  const formattedOriginalPrice = new Intl.NumberFormat('ko-KR').format(cartInfo.originalTotalPrice);
  const formattedDiscountPrice = new Intl.NumberFormat('ko-KR').format(cartInfo.discountTotalPrice);
  const formattedSellPricePrice = new Intl.NumberFormat('ko-KR').format(cartInfo.sellTotalPrice);

  return (
    <div className="border-gray-400 border-2 rounded-lg w-[300px] text-xs font-bold">
      <h1 className="p-2">결제 금액을 확인해주세요</h1>
      <hr />
      <div className="p-3">
        <div className="between">
          <p>상품 금액</p>
          <p>{formattedOriginalPrice}원</p>
        </div>
        <div className="between">
          <p>할인 금액</p>
          <p className="text-red-500">{formattedDiscountPrice}원</p>
        </div>
      </div>
      <hr />
      <div className="between p-3">
        <p>총 결제 금액</p>
        <p>{formattedSellPricePrice}원</p>
      </div>
    </div>
  );
};

export default CheckPayment;