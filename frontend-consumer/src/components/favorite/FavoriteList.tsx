import love from "../../assets/favorite/love.png";
import nolove from "../../assets/favorite/nolove.png";

const FavoriteList = () => {
  return (
    <div>
      <div>
        <div className="between p-4">
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

      {/* 안현성은 이것을 반드시 지워라 아니면 인생 망한다 */}
      <div>
        <div className="between p-4">
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
            <img className="w-6" src={nolove} alt="토글하트" />
          </div>
        </div>
        <hr className="mx-4" />
      </div>
    </div>
  );
};

export default FavoriteList;
