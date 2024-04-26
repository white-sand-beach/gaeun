import StoreSearch from "../../components/search/StoreSearch";
import ServiceBanner from "../../components/navbar/ServiceBanner";
import RealTimeTrendingSearch from "../../components/search/RealTimeTrendingSearch";

const SearchPage = () => {
  return (
    <div className="pt-16">
      <div className="my-2 center">
        <StoreSearch />
      </div>

      {/* 백에서 보내준 카테고리 정보 들어갈 공간 */}
      <div className="p-4 center">
        <img
          className="w-40"
          src="https://wimg.mk.co.kr/news/cms/202305/25/news-p.v1.20230525.6d276631f7624c4780068876d92b978c_P1.jpg"
          alt="카테고리 정보"
        />
      </div>

      <div className="border-y-2 border-gray-200 mr-4">
        <ServiceBanner />
      </div>
      <hr className="border-4 border-gray-100" />

      <div className="center">
        <RealTimeTrendingSearch />
      </div>
    </div>
  );
};

export default SearchPage;
