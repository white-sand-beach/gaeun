import StoreSearch from "../../components/search/StoreSearch";
import BannerSlider from "../../components/navbar/ServiceBanner";
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

      <div className="w-11/12 mx-auto mb-4 border-2 border-orange-400 center h-14 rounded-xl">
        <BannerSlider />
      </div>
      <hr className="border-4 border-gray-100" />

      <div className="pt-4 pb-16 center">
        <RealTimeTrendingSearch />
      </div>
    </div>
  );
};

export default SearchPage;
