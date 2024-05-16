import { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import OrderValidationForm from "../../services/orders/OrderValidationService";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderInfoId = queryParams.get('orderInfoId');
    const paymentId = queryParams.get('paymentId');

    const validatePayment = async () => {
      if (paymentId) {
        try {
          // 비동기 API 호출을 await로 처리
          const validationResponse = await OrderValidationForm(String(orderInfoId), paymentId);
          console.log("Validation successful", validationResponse);
          navigate("/order-state", { state: { orderInfoId: orderInfoId }});  // 검증 성공 시 리다이렉트
        } catch (error) {
          console.error("Validation failed", error);
          console.log("paymentId", paymentId)
        }
      }
    };

    validatePayment();
  }, [location]);

  return(
    <div>
      로딩중..
    </div>
  )
}

export default Payment;