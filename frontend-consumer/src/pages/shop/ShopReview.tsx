import { useState } from "react";

import ServiceBanner from "../../components/navbar/ServiceBanner";
import Review from "./Review";

const ShopReview = () => {
  const [checked, setChecked] = useState(false);

  const changeChceck = () => {
    setChecked(!checked);
  };

  return (
    <div className="w-full bg-white">
      <div>
        <ServiceBanner />
      </div>
      <hr className="w-full" />
      <div className="ml-2">
        <div className="flex items-center mt-2 space-x-2 mb-7">
          <input
            type="checkbox"
            checked={checked}
            onChange={changeChceck}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-700">
            사진리뷰 보기
          </label>
        </div>
        <div>
          <Review />
          <Review />
          <Review />
        </div>
      </div>
    </div>
  );
};

export default ShopReview;
