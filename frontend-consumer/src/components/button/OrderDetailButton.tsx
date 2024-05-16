import { OrderInfo } from "../../types/OrderType";

// interface orderInfoProps {
//   orderInfoId:
// }

const OrderDetailButton = ({ orderInfoId }: OrderInfo) => {
  const handleDetailSubmit = async () => {

  };
  return (
    <button
      onClick={handleDetailSubmit}
      className="order-detail-button"
    >{`상세내역 보러가기 >`}</button>
  );
};

export default OrderDetailButton;
