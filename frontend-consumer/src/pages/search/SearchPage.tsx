import { useEffect, useState } from "react";
import StoreSearch from "../../components/search/StoreSearch";
import Categories from "../../components/category/Categories";
import MainMapData from "../../types/MainMapDataType";
import MapListForm from "../../services/maps/MapMainService";
import { MainAllData } from "../../types/MainAllDataType";
import { StoreList } from "../../types/StoreList";
import SearchStoreList from "../../components/search/SearchStoreList";

const SearchPage = () => {
  const [mapData, setMapData] = useState<MainMapData>({
    radius: 3,
    longitude: 0,
    latitude: 0,
    page: 0,
    size: 10,
    sort: "distance",
  });
  const [storeList, setStoreList] = useState<StoreList[]>([]);
  const [allData, setAllData] = useState<MainAllData>({
    storeList: [],
    page: 0,
    hasNext: false,
  });
  const [intro, setInfro] = useState(
    "찾고 싶은 가게 이름이나 카테고리를 검색하세요!"
  );

  useEffect(() => {
    const userLocation = localStorage.getItem("user-location");
    if (userLocation) {
      const parsedLocation = JSON.parse(userLocation);
      setMapData((prevData) => ({
        ...prevData,
        longitude: parsedLocation.state.longitude,
        latitude: parsedLocation.state.latitude,
      }));
    }
  }, []);

  const handleSearch = async (keyword: string) => {
    if (!keyword) return;

    setMapData((prevData) => ({
      ...prevData,
      keyword,
      page: 0,
    }));

    try {
      const response = await MapListForm({ ...mapData, keyword });
      console.log(response);
      setAllData({
        storeList: response.storeList,
        page: 0,
        hasNext: response.hasNext,
      });
      setStoreList(response.storeList);
      setInfro("검색 결과가 없습니다.");
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      setMapData((prevData) => ({
        ...prevData,
        keyword: "",
        page: 0,
      }));
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    setMapData((prevData) => ({
      ...prevData,
      categoryId,
      page: 0,
    }));

    try {
      const response = await MapListForm({ ...mapData, categoryId });
      console.log(response);
      setAllData({
        storeList: response.storeList,
        page: 0,
        hasNext: response.hasNext,
      });
      setStoreList(response.storeList);
      setInfro("검색 결과가 없습니다.");
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      setMapData((prevData) => ({
        ...prevData,
        categoryId: "",
        page: 0,
      }));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight && allData.hasNext) {
        setAllData((prevState) => ({
          ...prevState,
          page: prevState.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allData.hasNext]);

  return (
    <div className="pt-14">
      <div className="fixed bg-white">
        <div className="my-2 center">
          <StoreSearch onSearch={handleSearch} />
        </div>

        <div className="py-2 center">
          <Categories onCategoryChange={handleCategoryChange} />
        </div>
        <hr className="border-4 border-gray-100" />
      </div>

      <div className="pb-16 pt-80">
        {/* 가게 정보 넣는 곳 */}
        {storeList.length > 0 ? (
          storeList.map((store, index) => (
            <SearchStoreList key={index} store={store} />
          ))
        ) : (
          <div className="h-[100px] center">
            <div className="text-lg">{intro}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
