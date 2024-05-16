import { OrderInfo } from "../../types/OrderType";
import OrderDetailGetService from "../../services/orders/OrderDetailGetService";
import { useNavigate } from "react-router-dom";

const OrderDetailButton = ({ orderInfoId }: OrderInfo) => {
  const navigate = useNavigate();

  const handleDetailSubmit = async () => {
    try {
      const response = await OrderDetailGetService(String(orderInfoId));
      console.log("상세 정보 요청 성공", response)
      navigate("/order-detail", { state: { orderDetail: response } });
    } catch (error) {
      console.error("상세 정보 가져오기 실패", error);
    }
  };
  return (
    <button
      onClick={handleDetailSubmit}
      className="order-detail-button"
    >{`상세내역 보러가기 >`}</button>
  );
};

export default OrderDetailButton;
