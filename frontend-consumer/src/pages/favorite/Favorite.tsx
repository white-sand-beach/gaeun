import { useEffect, useState } from "react";
import FavoriteList from "../../components/favorite/FavoriteList";
import FavoriteGetForm from "../../services/favorites/FavoriteGetService";
import { FavoriteResponse, FavoriteState  } from "../../types/FavoriteType";

const Favorite = () => {
  const [favoriteState, setFavoriteState] = useState<FavoriteState>({
    favorites: [],
    totalCnt: 0,
    page: 0,
    loading: false,
    hasNext: false,
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      setFavoriteState((prevState) => ({ ...prevState, loading: true }));
      try {
        const response: FavoriteResponse = await FavoriteGetForm({ page: favoriteState.page, size: 10 });
        setFavoriteState((prevState) => ({
          ...prevState,
          favorites: [...prevState.favorites, ...response.data.favorites || []],
          totalCnt: response.data.totalCnt,
          hasNext: response.data.hasNext,
        }));
      } catch (error) {
        console.error("에러발생 에러발생! ", error);
      } finally {
        setFavoriteState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchFavorites();
  }, [favoriteState.page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight && !favoriteState.loading && favoriteState.hasNext) {
        setFavoriteState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [favoriteState.loading, favoriteState.hasNext]);

  return (
    <div className="pt-14 bg-gray-100">
      <div className="flex items-center border-2 border-gray-200">
        <p className="p-2 text-sm font-bold">내가 찜한 맛집</p>
        <p className="text-xs text-gray-500 font-bold">{favoriteState.totalCnt}개</p>
      </div>
      <div className="bg-white">
        {/* 찜 리스트 */}
        <FavoriteList favorites={favoriteState.favorites} />
      </div>
    </div>
  );
};

export default Favorite;
