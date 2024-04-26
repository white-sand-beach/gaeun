import CountButton from "../button/CountButton";
import right from "../../assets/right.png";

const CheckOrder = () => {
  return (
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
                <p className="text-xs  text-gray-400">
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
  );
};

export default CheckOrder;
