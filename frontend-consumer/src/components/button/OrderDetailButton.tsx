import { Link } from "react-router-dom";

const OrderDetailButton = () => {
  return (
    <>
      <Link to="/order-detail">
        <button className="order-detail-button">{`상세내역 보러가기 >`}</button>
      </Link>
    </>
  );
};

export default OrderDetailButton;
