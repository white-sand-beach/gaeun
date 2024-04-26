import FavoriteList from "../../components/favorite/FavoriteList";

const Favorite = () => {
  return (
    <div className="pt-14 bg-gray-100">
      <div className="flex items-center border-2 border-gray-200">
        <p className="p-2 text-sm font-bold">내가 찜한 맛집</p>
        <p className="text-xs text-gray-500 font-bold">2개</p>
      </div>
      <div className="bg-white">

        {/* 찜 리스트 */}
        <FavoriteList />
      </div>
    </div>
  );
};

export default Favorite;
