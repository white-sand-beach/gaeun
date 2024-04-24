const Alarm = () => {
  return (
    <div className="pt-14">
      {/* 컴포넌트로 만들 거에요 */}
      <div className="bg-orange-100">
        <div className="flex justify-between items-center pt-2 px-4">
          <p className="text-xs text-gray-500 font-bold">4.18(목) 17:04</p>
          <p className="text-xs text-gray-400 font-bold">주문 성공</p>
        </div>
        <div className="flex justify-between items-center pb-2 pl-6">
          <div className="font-bold">
            <h1 className="text-lg">가게명</h1>
            <p className="text-xxs text-gray-400">
              메뉴 1개, 메뉴 2개 혹은 메뉴 외 1개
            </p>
            <div className="flex text-sm">
              <p>결제 금액</p>
              <p className="text-red-500 ml-2">31,900원</p>
            </div>
          </div>
          {/* 버튼 컴포넌트 만들거에요 */}
          <button className="white-button">{`상세내역 보러가기 >`}</button>
        </div>
        <hr />
      </div>

      {/* 컴포넌트로 만들 거에요 */}
      <div className="bg-white">
        <div className="flex justify-between items-center pt-2 px-4">
          <p className="text-xs text-gray-500 font-bold">4.18(목) 17:04</p>
          <p className="text-xs text-gray-400 font-bold">주문 성공</p>
        </div>
        <div className="flex justify-between items-center pb-2 pl-6">
          <div className="font-bold">
            <h1 className="text-lg">가게명</h1>
            <p className="text-xxs text-gray-400">
              메뉴 1개, 메뉴 2개 혹은 메뉴 외 1개
            </p>
            <div className="flex text-sm">
              <p>결제 금액</p>
              <p className="text-red-500 ml-2">31,900원</p>
            </div>
          </div>
          <button className="white-button">{`상세내역 보러가기 >`}</button>
        </div>
        <hr />
      </div>
      
    </div>
  );
};

export default Alarm;
