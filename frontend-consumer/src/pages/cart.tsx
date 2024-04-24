import right from "../assets/right.png";

const Cart = () => {
  return (
    <div>
      <div className="flex justify-center pt-20">
        <div className="border-gray-400 border-2 rounded-lg w-[300px]">
          {/* 가게 로고 및 가게명 전체 삭제 기능 */}
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center">
              <img
                className="w-4 h-4 rounded-full"
                src="https://img.hankyung.com/photo/202403/01.36047379.1.jpg"
                alt=""
              />
              <p className="ml-2 font-bold text-sm">가게 이름 · OO점</p>
            </div>
            <p className="font-bold text-xxxs text-gray-400">전체 삭제</p>
          </div>
          <hr />

          {/* 나중에 담은 정보 리스트 map으로나열 */}
          <div className="p-2">
            <div className="flex items-center">
              {/* 음식 이미지 */}
              <img
                className="w-16 h-16"
                src="https://img.hankyung.com/photo/202403/01.36047379.1.jpg"
                alt=""
              />
              {/* 음식 정보 */}
              <div className="ml-2">
                <h1 className="text-md font-extrabold"> 음식 이름 </h1>
                <p className="text-xs text-gray-400 font-bold">
                  음식재료 + 음식재료 + 재료
                </p>
                <div className="flex items-center text-xs font-extrabold">
                  <span className="line-through">19,900원</span>
                  <img
                    className="mx-2 w-3 h-3"
                    src={right}
                    alt="오른쪽 화살표"
                  />
                  <span className="text-red-500">13,900원</span>
                </div>
              </div>
            </div>
            {/* 버튼 컴포넌트로 만들 예정 */}
            <div className="flex justify-end ">
              <div className="flex justify-between px-4 border-gray-200 border-2 rounded-xl w-[80px] font-bold text-sm py-1">
                <span>-</span>
                <span>1</span>
                <span>+</span>
              </div>
            </div>
          </div>
          <hr />

          {/* 반복되는 부분 삭제해라!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          <div className="p-2">
            <div className="flex items-center">
              {/* 음식 이미지 */}
              <img
                className="w-16 h-16"
                src="https://img.hankyung.com/photo/202403/01.36047379.1.jpg"
                alt=""
              />
              {/* 음식 정보 */}
              <div className="ml-2">
                <h1 className="text-md font-extrabold"> 음식 이름 </h1>
                <p className="text-xs text-gray-400 font-bold">
                  음식재료 + 음식재료 + 재료
                </p>
                <div className="flex items-center text-xs font-extrabold">
                  <span className="line-through">19,900원</span>
                  <img
                    className="mx-2 w-3 h-3"
                    src={right}
                    alt="오른쪽 화살표"
                  />
                  <span className="text-red-500">13,900원</span>
                </div>
              </div>
            </div>
            {/* 버튼 컴포넌트로 만들 예정 */}
            <div className="flex justify-end ">
              <div className="flex justify-between px-4 border-gray-200 border-2 rounded-xl w-[80px] font-bold text-sm py-1">
                <span>-</span>
                <span>1</span>
                <span>+</span>
              </div>
            </div>
          </div>
          <hr />

          <div className="flex justify-center items-center p-2">
            <div className="text-xs font-extrabold">+ 메뉴추가</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <div className="border-gray-400 border-2 rounded-lg w-[300px] ">
          <h1 className="text-xs font-bold p-2">결제 금액을 확인해주세요</h1>
          <hr />
          <div className="p-3">
            <div className="flex justify-between">
              <p className="text-xs font-bold">상품 금액</p>
              <p className="text-xs font-bold">42,800원</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-bold">할인 금액</p>
              <p className="text-xs font-bold text-red-500">13,800원</p>
            </div>
          </div>
          <hr />
          <div className="flex justify-between p-3">
          <p className="text-xs font-bold">총 결제 금액</p>
          <p className="text-xs font-bold">29,800원</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <button className="footer-button">29,800원 결제하기</button>
      </div>
    </div>
  );
};

export default Cart;
