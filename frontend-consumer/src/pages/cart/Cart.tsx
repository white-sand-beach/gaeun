import CheckOrder from "../../components/cart/CheckOrder";
import CheckPayment from "../../components/cart/CheckPayment";
import PaymentButton from "../../components/button/PaymentButton";

const Cart = () => {
  return (
    <div className="pt-20 pb-8">
      {/* 주문 확인 */}
      <div className="center">
        <CheckOrder />
      </div>

      {/* 결제 확인 */}
      <div className="center pt-4">
        <CheckPayment />
      </div>
      <div className="center pt-12">
        <PaymentButton/>
        
      </div>
    </div>
  );
};

export default Cart;
