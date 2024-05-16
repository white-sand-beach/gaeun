import CallButton from "../../components/button/CallButton";
// import OrderDetailButton from "../../components/button/OrderDetailButton";

const OrderState = () => {
  return (
    <div className="pt-16">
      <header className="between mx-4 mt-2">
        <p className="text-sm font-bold">사장님이 열심히 준비하는 중이에요!</p>
        <div className="p-2 text-xxs text-white rounded-lg bg-myColor font- bold">
          5분 남음
        </div>
      </header>

      <div className="center my-4">
        <div className="w-[300px] border-2 rounded-lg text-xxs text-gray-400 font-bold p-4">
          <div>
            <p className="text-lg text-black">스진남 진평점</p>
          </div>

          <div className="my-2">
            <p>가게가 마감하기 전에 반드시 픽업해주세요!</p>
          </div>
          <div className="center justify-between">
            <div className="flex items-center mt-1">
              <CallButton />
            </div>
            {/* <OrderDetailButton /> */}
          </div>
        </div>
      </div>
      {/* 지도 자리 */}
    </div>
  );
};

export default OrderState;
