const OrderDetailInfo = () => {
  return (
    <div className="p-4">
      <h1 className="font-bold">{`스진남 진평점 >`}</h1>
      <p className="text-sm font-bold">주문 정보</p>
      <div className="mt-3 text-xs text-gray-400 ">
        <div className="between">
          <p>주문 시간</p>
          <p>00.00.00 00:00</p>
        </div>
        <div className="between">
          <p>주문 번호</p>
          <p>F24031-81-804J1555B8</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailInfo;