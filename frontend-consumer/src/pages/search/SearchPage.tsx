import { useEffect, useState } from "react";
import StoreSearch from "../../components/search/StoreSearch";
import Categories from "../../components/category/Categories";
import MainMapData from "../../types/MainMapDataType";
import MapListForm from "../../services/maps/MapMainService";
import { MainAllData } from "../../types/MainAllDataType";
import { StoreList } from "../../types/StoreList";
import SearchStoreList from "../../components/search/SearchStoreList";
import RealTimeTrendingSearch from "../../components/search/RealTimeTrendingSearch";
import PopularSearchListService from "../../services/searches/PopularSearchListService";
import { KeywordInfo } from "../../types/PopularSearchList";

const SearchPage = () => {
  const [mapData, setMapData] = useState<MainMapData>({
    radius: 3,
    longitude: 0,
    latitude: 0,
    page: 0,
    size: 10,
    sort: "distance",
  });
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(true);
  const [storeList, setStoreList] = useState<StoreList[]>([]);
  const [popularSearchList, setPopularSearchList] = useState<KeywordInfo[]>([]);
  const [hour, setHour] = useState<number>(0);
  const [allData, setAllData] = useState<MainAllData>({
    storeList: [],
    page: 0,
    hasNext: false,
  });


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

    const fetchPopularSearches = async () => {
      try {
        const data = await PopularSearchListService();
        console.log("Fetched Popular Searches:", data);
        console.log("Fetched Popular Searches:", data.keywordInfoList);
        setPopularSearchList(data.keywordInfoList);
        setHour(data.hour);
      } catch (error) {
        console.error("Failed to fetch popular searches:", error);
      }
    };

    fetchPopularSearches();
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
      setIsSearchFocused(false);
      console.log(isSearchFocused);
      // setInfro("검색 결과가 없습니다.");
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
      setIsSearchFocused(false);
      console.log(isSearchFocused);
      // setInfro("검색 결과가 없습니다.");
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

  const handleKeywordClick = (keyword: string) => {
    handleSearch(keyword);
  };

  const handleSearchFocus = () => {
    console.log(isSearchFocused);
    setIsSearchFocused(true);
  };

  return (
    <div className="pt-16">
      <div className="fixed w-full bg-white">
        <div className="my-2 center">
          <StoreSearch onSearch={handleSearch} onClick={handleSearchFocus} />
        </div>
      </div>

      <div className="pt-16">
        {isSearchFocused ? (
          <div>
            <div className="py-2 center">
              <Categories onCategoryChange={handleCategoryChange} />
            </div>
            <hr className="border-4 border-gray-100" />
            <div>
              <RealTimeTrendingSearch popularSearchList={popularSearchList} hour={hour} onKeywordClick={handleKeywordClick} />
            </div>
          </div>
        ) : (
          storeList.map((store, index) => (
            <SearchStoreList key={index} store={store} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
