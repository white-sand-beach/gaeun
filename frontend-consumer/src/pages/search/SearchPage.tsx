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
      
      <div className="py-4 center">
        <Categories />
      </div>

      <div className="border-y-2">
        <ServiceBanner />
      </div>
      <hr className="border-4 border-gray-100" />

      <div className="center pt-4">
        <RealTimeTrendingSearch />
      </div>
    </div>
  );
};

export default SearchPage;
