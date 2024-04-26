import ReorderButton from "../../components/button/ReorderButton";
import ReviewButton from "../../components/button/ReviewButton";

const OrderDetail = () => {
  return (
    <div className="flex justify-center pt-14">
      <div className="w-[360px]">
        {/* 가게명 및 주문 정보 */}
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

        {/* 주문 내역 */}
        <div className="center">
          <div className="w-[300px] border-[1px] border-gray-300 rounded-lg text-xs font-bold mx-6 p-2">
            <h1 className="ml-2">주문 내역</h1>
            <hr className="my-2" />
            <div className="between mx-2">
              <p>메뉴명 (아주 맛있는 것)</p>
              <p>13,900원</p>
            </div>
          </div>
        </div>

        {/* 결제 내역 */}
        <div className="center">
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
        </div>

        {/* 재주문 및 리뷰 작성 버튼 */}
        <div className="between mt-4 mx-7">
          <ReorderButton />
          <ReviewButton />
        </div>
        <div className="center">
          <div className="w-[300px] mx-6 mt-4">
            <div>
              <p className="fixed mx-2 font-bold text-gray-400 bottom-16 text-xxs">
                주문 내역 삭제 시 되돌릴 수 없습니다.
              </p>
              <button className="footer-button">주문내역 삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
