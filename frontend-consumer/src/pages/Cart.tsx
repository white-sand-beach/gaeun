import CountButton from "../components/button/CountButton";

import right from "../assets/right.png";

const Cart = () => {
  return (
    <div className="pt-20 pb-8">
      <div className="flex justify-center">
        <div className="border-gray-400 border-2 rounded-lg w-[300px]">
          {/* 가게 로고 및 가게명 전체 삭제 기능 */}
          <div className="between p-2">
            <div className="flex items-center">
              <img
                className="w-4 h-4 rounded-full"
                src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
                alt=""
              />
              <p className="ml-2 text-sm font-bold">가게 이름 · OO점</p>
            </div>
            <p className="font-bold text-gray-400 text-xxxs">전체 삭제</p>
          </div>
          <hr />

          {/* 나중에 담은 정보 리스트 map으로나열 */}
          <div className="p-2">
            <div className="flex items-center">
              {/* 음식 이미지 */}
              <img
                className="w-16 h-16 rounded-md"
                src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
                alt=""
              />
              {/* 음식 정보 */}
              <div className="ml-2">
                <h1 className="font-extrabold text-md"> 음식 이름 </h1>
                <p className="text-xs font-bold text-gray-400">
                  음식재료 + 음식재료 + 재료
                </p>
                <div className="flex items-center text-xs font-extrabold">
                  <span className="line-through">19,900원</span>
                  <img
                    className="w-3 h-3 mx-2"
                    src={right}
                    alt="오른쪽 화살표"
                  />
                  <span className="text-red-500">13,900원</span>
                </div>
              </div>
            </div>
            {/* 버튼 컴포넌트로 만들 예정 */}
            <div className="flex justify-end ">
              <CountButton />
            </div>
          </div>
          <hr />

          {/* 반복되는 부분 삭제해라!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          <div className="p-2">
            <div className="flex items-center">
              {/* 음식 이미지 */}
              <img
                className="w-16 h-16 rounded-md"
                src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
                alt=""
              />
              {/* 음식 정보 */}
              <div className="ml-2">
                <h1 className="font-extrabold text-md"> 음식 이름 </h1>
                <p className="text-xs font-bold text-gray-400">
                  음식재료 + 음식재료 + 재료
                </p>
                <div className="flex items-center text-xs font-extrabold">
                  <span className="line-through">19,900원</span>
                  <img
                    className="w-3 h-3 mx-2"
                    src={right}
                    alt="오른쪽 화살표"
                  />
                  <span className="text-red-500">13,900원</span>
                </div>
              </div>
            </div>
            {/* 버튼 컴포넌트로 만들 예정 */}
            <div className="flex justify-end ">
              <CountButton />
            </div>
          </div>
          <hr />

          <div className="flex items-center justify-center p-2">
            <div className="text-xs font-extrabold">+ 메뉴추가</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
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
      </div>
      <div className="flex justify-center pt-12">
        <button className="footer-button">29,800원 결제하기</button>
      </div>
    </div>
  );
};

export default Cart;
