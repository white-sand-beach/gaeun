import { Link } from "react-router-dom";

import { StoreList } from "../../types/StoreList";
import logo from "../../../public/windows11/LargeTile.scale-100.png";

const SearchStoreList = ({ store }: { store: StoreList }) => {
  return (
    <div>
      
      <div className="between p-4">
        <Link to={`/shop/${store.storeId}`}>
          <div className="flex items-center">
            <img
              className="w-20 h-20 object-cover rounded-lg"
              src={store.imageURL || logo}
              alt=""
            />
            <div>
              <h1 className="font-bold ml-2">{store.name}</h1>
              <div className="ml-2 text-gray-500 text-xs font-bold">
                <div>{store.operatingTime}</div>
                <span>찜수 {store.favoriteCnt}</span>
                <span className="mx-1">·</span>
                <span>편지 수 {store.reviewCnt}</span>
              </div>
            </div>
          </div>
        </Link>
        <div></div>
      </div>
      <hr className="mx-4" />
    </div>
  );
};

export default SearchStoreList;
