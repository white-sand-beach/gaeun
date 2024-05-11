import CallButton from "../../components/button/CallButton";
import OrderDetailButton from "../../components/button/OrderDetailButton";

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
            <div className="flex items-center mt-1">
              <CallButton />
              <p className="ml-2 font-normal">
                마감 시간에는 전화를 받지 못할 때도 있어요.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="between mt-1">
              <div className="flex text-xs text-black space-x-2">
                <p>마감 시간</p>
                <p>21:00</p>
              </div>
              <OrderDetailButton />
            </div>
            <p className="mt-1 font-normal">
              가게가 마감하기 전에 반드시 픽업해주세요!
            </p>
          </div>
          <div className="center justify-end"></div>
        </div>
      </div>
      {/* 지도 자리 */}
      <img
        className="rounded-md"
        src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
        alt=""
      />
      <img
        className="rounded-md"
        src="https://wimg.mk.co.kr/news/cms/202305/25/news-p.v1.20230525.6d276631f7624c4780068876d92b978c_P1.jpg"
        alt=""
      />
    </div>
  );
};

export default OrderState;
