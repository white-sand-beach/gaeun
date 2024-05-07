const OrderDetail = () => {
  return (
    <div className="no-footer items-start px-4 gap-2 top-[80px]">
      <h1>음식명(메뉴이름)</h1>
      <p className="text-xl font-bold">주문정보</p>
      <div className="flex flex-row justify-between w-full">
        <p>주문 시간</p>
        <p>2024-05-05</p>
      </div>
      <div className="flex flex-row justify-between w-full">
        <p>주문 번호</p>
        <p>1234-56789-45156</p>
      </div>
      <div className="flex flex-col w-full font-bold border-2 p-2 rounded-[10px] mt-5">
        <p className="p-2 border-b-2">주문 내역</p>
        <div className="flex flex-row justify-between w-full p-2">
          <p>두툼 연어초밥 (핵 두꺼움)</p>
          <p>13,900원</p>
        </div>
      </div>
      <div className="flex flex-col w-full font-bold border-2 border-black p-2 rounded-[10px] mt-5">
        <p className="p-2 border-b-2">결제 내역</p>
        <div className="flex flex-col justify-center border-b-2">
          <div className="flex flex-row justify-between p-2 text-gray-500">
            <p>주문금액</p>
            <p>13,900원</p>
          </div>
          <div className="flex flex-row justify-between p-2 text-gray-500">
            <p>할인금액</p>
            <p>6,900원</p>
          </div>
        </div>
        <div className="flex flex-col w-full font-extrabold">
          <div className="flex flex-row justify-between p-2 text-gray-500">
            <p>결제방식</p>
            <p>카카오페이</p>
          </div>
          <div className="flex flex-row justify-between p-2">
            <p>총 결제금액</p>
            <p>7,000원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
