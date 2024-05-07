import FavoriteButton from "@/components/button/FavoriteButton";
import FavoritePostForm from "@/services/favorites/FavoritePostService";
import FavoriteDeleteForm from "@/services/favorites/FavoriteDeleteService";

import { FavoriteItem } from "@/types/FavoriteType";

interface FavoriteListProps {
  favorites: FavoriteItem[];
}

const FavoriteList = ({ favorites }: FavoriteListProps) => {
  return (
    <div>
      {favorites.map((favorite) => (
        <FavoriteListItem key={favorite.favoriteId} favorite={favorite} />
      ))}
    </div>
  );
};

const FavoriteListItem = ({ favorite }: { favorite: FavoriteItem }) => {
  const handleToggle = (isFavorite: boolean) => {
    if (isFavorite) {
      // 찜 등록 API 호출
      FavoritePostForm({ storeId: favorite.storeId });
    } else {
      // 찜 삭제 API 호출
      FavoriteDeleteForm({ favoriteId: favorite.favoriteId });
    }
  };

  return (
    <div>
      <div className="between p-4">
        <div className="flex items-center">
          <img
            className="w-20 h-2w-20 rounded-lg"
            src={favorite.storeImageUrl}
            alt={favorite.storeName}
          />
          <div>
            <h1 className="font-bold ml-2">{favorite.storeName}</h1>
            <div className="ml-2 text-gray-500 text-xs font-bold">
              <span>찜수 {favorite.storeFavoriteCnt}</span>
              <span className="mx-1">·</span>
              <span>리뷰수 {favorite.storeReviewCnt}</span>
            </div>
          </div>
        </div>
        {/* 토글 버튼 */}
        <FavoriteButton
          isFavorite={favorite.isFavorite}
          onToggle={handleToggle}
        />
      </div>
      <hr className="mx-4" />
    </div>
  );
};

export default FavoriteList;