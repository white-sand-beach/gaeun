import love from "../assets/favorite/love.png";
import nolove from "../assets/favorite/nolove.png";

const Favorite = () => {
  return (
    <div className="pt-14 bg-gray-200">
      <div className="flex items-center">
        <p className="p-2 text-sm font-bold">내가 찜한 맛집</p>
        <p className="text-xs text-gray-500 font-bold">2개</p>
      </div>
      <div className="bg-white">
        {/* 찜 리스트 */}
        <div>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <img
                className="w-20 h-2w-20 rounded-lg"
                src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
                alt=""
              />
              <div>
                <h1 className="font-bold ml-2">카리나에 빠지다 인동직영점</h1>
                <div className="ml-2 text-gray-500 text-xs font-bold">
                  <span>찜수 1</span>
                  <span className="mx-1">·</span>
                  <span>리뷰수 50000</span>
                </div>
              </div>
            </div>
            {/* 토글 버튼 */}
            <div>
              <img className="w-6" src={love} alt="토글하트" />
            </div>
          </div>
          <hr className="mx-4" />
        </div>
        <div>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <img
                className="w-20 h-2w-20 rounded-lg"
                src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
                alt=""
              />
              <div>
                <h1 className="font-bold ml-2">가게명</h1>
                <div className="ml-2 text-gray-500 text-xs font-bold">
                  <span>찜수 123</span>
                  <span className="mx-1">·</span>
                  <span>리뷰수 456</span>
                </div>
              </div>
            </div>
            {/* 토글 버튼 */}
            <div>
              <img className="w-6" src={nolove} alt="토글하트" />
            </div>
          </div>
          <hr className="mx-4" />
        </div>
      </div>
    </div>
  );
};

export default Favorite;
