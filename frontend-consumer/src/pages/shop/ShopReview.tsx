import { useState } from "react";

import BannerSlider from "../../components/navbar/ServiceBanner";
import Review from "./Review";

const ShopReview = () => {
  const [checked, setChecked] = useState(false);

  const changeChceck = () => {
    setChecked(!checked);
  };

  return (
    <div className="w-full bg-white">
      <div className="w-11/12 mx-auto mt-4 mb-4 border-2 border-orange-400 center h-14 rounded-xl">
        <BannerSlider />
      </div>
      <hr className="w-full" />
      <hr className="border-4 border-gray-100" />
      <div className="flex items-center mt-2 space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={changeChceck}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700 ">
          사진리뷰 보기
        </label>
      </div>

      <div>
        <Review />
      </div>
    </div>
  );
};

export default ShopReview;
