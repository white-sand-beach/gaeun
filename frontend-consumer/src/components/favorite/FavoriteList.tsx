import { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../button/FavoriteButton";
import FavoritePostForm from "../../services/favorites/FavoritePostService";
import FavoriteDeleteForm from "../../services/favorites/FavoriteDeleteService";

import { FavoriteItem } from "../../types/FavoriteType";

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
  const [isFavorite, setIsFavorite] = useState(true);

  const handleToggle = async (newIsFavorite: boolean) => {
    try {
      if (newIsFavorite) {
        // 찜 등록 API 호출
        await FavoritePostForm({ storeId: favorite.storeId });
      } else {
        // 찜 삭제 API 호출
        await FavoriteDeleteForm({ favoriteId: favorite.favoriteId });
      }
      setIsFavorite(newIsFavorite);
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  return (
    <div>
      <div className="between p-4">
        <Link to={`/shop/${favorite.storeId}`}>
          <div className="flex items-center">
            <img
              className="w-20 h-20 object-cover rounded-lg"
              src={favorite.storeImageUrl}
              alt={favorite.storeName}
            />
            <div>
              <h1 className="font-bold ml-2">{favorite.storeName}</h1>
              <div className="ml-2 text-gray-500 text-xs font-bold">
                <span>찜수 {favorite.storeFavoriteCnt}</span>
                <span className="mx-1">·</span>
                <span>편지 수 {favorite.storeReviewCnt}</span>
              </div>
            </div>
          </div>
        </Link>
        {/* 토글 버튼 */}
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={handleToggle}
        />
      </div>
      <hr className="mx-4" />
    </div>
  );
};

export default FavoriteList;