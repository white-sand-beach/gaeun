import StoreSearch from "../../components/search/StoreSearch";
import ServiceBanner from "../../components/navbar/ServiceBanner";
import RealTimeTrendingSearch from "../../components/search/RealTimeTrendingSearch";
import Categories from "../../components/category/Categories";

const SearchPage = () => {
  return (
    <div className="pt-16">
      <div className="my-2 center">
        <StoreSearch />
      </div>
      
      <div className="py-2 center">
        <Categories />
      </div>

      <div className="center mb-4 w-11/12 mx-auto border-2 border-orange-400 h-14 rounded-xl">
        <ServiceBanner />
      </div>
      <hr className="border-4 border-gray-100" />

      <div className="center pt-4 pb-16">
        <RealTimeTrendingSearch />
      </div>
    </div>
  );
};

export default SearchPage;
