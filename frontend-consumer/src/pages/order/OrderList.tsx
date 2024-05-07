import OrderSearch from "@/components/search/OrderSearch";
import Ordertarget from "@/components/order/OrderTarget";

const OrderList = () => {
  return (
    <div className="pt-16">
      {/* 가게 및 메뉴 검색 */}
      <div className="my-2 center">
        <OrderSearch />
      </div>

      {/* 주문 목록 */}
      <div className="center">
        <Ordertarget />
      </div>
      <div className="center">
        <Ordertarget />
      </div>
      <div className="center">
        <Ordertarget />
      </div>
      <div className="center">
        <Ordertarget />
      </div>
      <div className="center">
        <Ordertarget />
      </div>
      <div className="center">
        <Ordertarget />
      </div>
      <div className="center">
        <Ordertarget />
      </div>
      <div className="center">
        <Ordertarget />
      </div>
    </div>
  );
};

export default OrderList;
