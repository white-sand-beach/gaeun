import { useNavigate } from "react-router-dom";

import { StoreList } from "../../types/StoreList";
import MainMenu from "./MainMenu";

const Shops = ({ store }: { store: StoreList }) => {
  const navigate = useNavigate();

  const goStore = () => {
    navigate(`/shop/${store.storeId}`);
  };

  return (
    <div>
      <div>
        <div>
          <div onClick={goStore}>
            <div className="flex justify-between">
              <div className="flex">
                <h2 className="text-lg font-bold text-sky-600">{store.name}</h2>
                <p className="mt-auto ml-1 text-sm text-gray-500">
                  {store.categoryList &&
                    store.categoryList.map((category, index) => (
                      <span key={index}>
                        {category.name}
                        {index !== store.categoryList.length - 1 && ", "}
                      </span>
                    ))}
                </p>
              </div>
              <div>
                <p className="mt-1 mr-3 text-sm text-black">
                  {store.distance}m
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{store.operatingTime}</p>
            <p className="text-sm">
              리뷰 {store.reviewCnt} · 가게 찜 {store.favoriteCnt}
            </p>
          </div>
          {/* 이미지 슬라이더 부분 */}
          <div className="flex gap-2 mt-2 overflow-x-scroll scrollbar-hide">
            {store.saleImageURLList &&
              store.saleImageURLList.map((item, index) => (
                <MainMenu key={index} imageURL={item.imageURL} />
              ))}
          </div>
        </div>
        <hr className="w-full my-2" />
      </div>
    </div>
  );
};

export default Shops;
