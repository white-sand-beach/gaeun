import { useEffect, useState } from "react";
import FavoriteList from "../../components/favorite/FavoriteList";
import FavoriteGetForm from "../../services/favorites/FavoriteGetService";
import { FavoriteResponse, FavoriteState } from "../../types/FavoriteType";

const Favorite = () => {
  const [favoriteState, setFavoriteState] = useState<FavoriteState>({
    favorites: [],
    totalCnt: 0,
    page: 0,
    loading: false,
    hasNext: false,
    scrollPosition: 0,
  });

  // 아래 부분은 스크롤 위치를 기억하여
  // 해당 페이지로 돌아왔을 때 다시 원래 위치를 찾아가는 기능인데
  // 저희 서비스에서는 아직 테스트를 해볼 수 없어서
  // 우선 주석 처리해두었습니다.
  // 추후에 좀 더 테스트 후 정상적으로 작동 시 말씀드리겠습니다.

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 이전에 저장된 스크롤 위치로 이동
  //   window.scrollTo(0, favoriteState.scrollPosition);
  // }, []);

  // useEffect(() => {
  //   // 스크롤 위치 변경 시 상태 업데이트
  //   const handleScroll = () => {
  //     setFavoriteState((prevState) => ({
  //       ...prevState,
  //       scrollPosition: window.pageYOffset,
  //     }));
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      setFavoriteState((prevState) => ({ ...prevState, loading: true }));
      try {
        const response: FavoriteResponse = await FavoriteGetForm({
          page: favoriteState.page,
          size: 10,
        });
        setFavoriteState((prevState) => ({
          ...prevState,
          favorites: [
            ...prevState.favorites,
            ...(response.data.favorites || []),
          ],
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

      if (
        scrollTop + clientHeight >= scrollHeight &&
        !favoriteState.loading &&
        favoriteState.hasNext
      ) {
        setFavoriteState((prevState) => ({
          ...prevState,
          page: prevState.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [favoriteState.loading, favoriteState.hasNext]);

  return (
    <div className="bg-gray-100 pt-14">
      <div className="flex items-center border-2 border-gray-200">
        <p className="p-2 text-sm font-bold">내가 찜한 맛집</p>
        <p className="text-xs font-bold text-gray-500">
          {favoriteState.totalCnt}개
        </p>
      </div>
      <div className="bg-white mb-14">
        {/* 찜 리스트 */}
        {favoriteState.favorites && (
          <FavoriteList favorites={favoriteState?.favorites} />
        )}
      </div>
    </div>
  );
};

export default Favorite;
