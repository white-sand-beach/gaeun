// import OrderDetailButton from "../../components/button/OrderDetailButton";

const Notification = () => {
  return (
    <div className="pt-14">
      {/* 컴포넌트로 만들 거에요 */}
      <div className="bg-orange-100">
        <div className="between px-4 pt-2 text-xs font-bold text-gray-400">
          <p>4.18(목) 17:04</p>
          <p className="text-xxs">주문 성공</p>
        </div>
        <div className="between pb-2 pl-6">
          <div className="font-bold">
            <h1>가게명</h1>
            <p className="text-gray-400 text-xxs">
              메뉴 1개, 메뉴 2개 혹은 메뉴 외 1개
            </p>
            <div className="flex text-xs">
              <p>결제 금액</p>
              <p className="ml-2 text-red-500">31,900원</p>
            </div>
          </div>
          {/* 버튼 컴포넌트 만들거에요 */}
          <div className="mt-4 mr-2">
            {/* <OrderDetailButton /> */}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Notification;
