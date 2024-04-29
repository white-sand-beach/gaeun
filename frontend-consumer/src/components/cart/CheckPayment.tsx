const CheckPayment = () => {
  return (
    <div className="border-gray-400 border-2 rounded-lg w-[300px] text-xs font-bold">
      <h1 className="p-2">결제 금액을 확인해주세요</h1>
      <hr />
      <div className="p-3">
        <div className="between">
          <p>상품 금액</p>
          <p>42,800원</p>
        </div>
        <div className="between">
          <p>할인 금액</p>
          <p className="text-red-500">13,800원</p>
        </div>
      </div>
      <hr />
      <div className="between p-3">
        <p>총 결제 금액</p>
        <p>29,800원</p>
      </div>
    </div>
  );
};

export default CheckPayment;