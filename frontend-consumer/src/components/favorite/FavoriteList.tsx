import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../button/FavoriteButton";
import FavoritePostForm from "../../services/favorites/FavoritePostService";
import ShoptFavoriteDeleteForm from "../../services/favorites/ShopFavoriteDeleteService";

import { FavoriteItem } from "../../types/FavoriteType";

import logo from "../../../public/windows11/LargeTile.scale-100.png";

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
  const [favoriteCount, setFavoriteCount] = useState(favorite.storeFavoriteCnt);

  const handleToggle = async (newIsFavorite: boolean) => {
    try {
      if (newIsFavorite) {
        // 찜 등록 API 호출
        await FavoritePostForm({ storeId: favorite.storeId });
        setFavoriteCount((prev) => prev + 1);
        console.log("찜 성공")
      } else {
        // 찜 삭제 API 호출
        await ShoptFavoriteDeleteForm({ storeId: favorite.storeId });
        setFavoriteCount((prev) => prev - 1);
        console.log("찜 삭제")
      }
      setIsFavorite(newIsFavorite);
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  useEffect(() => {
    setFavoriteCount(favorite.storeFavoriteCnt);
  }, [favorite.storeFavoriteCnt]);

  return (
    <div>
      <div className="between p-4">
        <Link to={`/shop/${favorite.storeId}`}>
          <div className="flex items-center">
            <img
              className="w-20 h-20 object-cover rounded-lg"
              src={favorite.storeImageUrl || logo}
              alt={favorite.storeName}
            />
            <div>
              <h1 className="font-bold ml-2">{favorite.storeName}</h1>
              <div className="ml-2 text-gray-500 text-xs font-bold">
                <span>찜수 {favoriteCount}</span>
                <span className="mx-1">·</span>
                <span>편지 수 {favorite.storeReviewCnt}</span>
              </div>
            </div>
          </div>
        </Link>
        {/* 토글 버튼 */}
        <FavoriteButton isFavorite={isFavorite} onToggle={handleToggle} />
      </div>
      <hr className="mx-4" />
    </div>
  );
};

export default FavoriteList;
