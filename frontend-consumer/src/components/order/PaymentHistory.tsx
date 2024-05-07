const PaymentHistory = () => {
  return (
    <div className="w-[300px] border-[1px] border-black rounded-lg text-xs font-bold mt-4 mx-6 p-2">
      <h1 className="ml-2">결제 내역</h1>
      <hr className="mt-2" />

      <div className="my-4">
        <div className="between mx-2 font-medium text-gray-400">
          <p>주문 금액</p>
          <p>19,900원</p>
        </div>
        <div className="between mx-2 font-medium text-gray-400">
          <p>할인 금액</p>
          <p>6000원</p>
        </div>
      </div>
      <hr />

      <div className="my-4">
        <div className="between mx-2 font-medium text-gray-400">
          <p>결제 방식</p>
          <p>카카오페이</p>
        </div>
        <div className="between mx-2 font-bold">
          <p>총 결제 금액</p>
          <p>13,900원</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
