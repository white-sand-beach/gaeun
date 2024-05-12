import CountButton from "../button/CountButton";
import right from "../../assets/store/right.png";

import { CartItem } from "../../types/CartType"

interface CheckOrderProps {
  menuData: CartItem;
}

const CheckOrder = ({ menuData }: CheckOrderProps) => {
  const formattedOriginalPrice = new Intl.NumberFormat('ko-KR').format(menuData.originalPrice * menuData.quantity);
  const formattedSellPrice = new Intl.NumberFormat('ko-KR').format(menuData.sellPrice * menuData.quantity);

  return (
    <div className={`p-2 ${menuData.isFinished ? 'bg-gray-100' : ""}`}>
      <div className="flex items-center">
        {/* 음식 이미지 */}
        <img
          className="w-16 h-16 rounded-md"
          src={menuData.imageUrl}
          alt="메뉴 사진"
        />
        {/* 음식 정보 */}
        <div className="ml-2">
          <h1 className="font-extrabold text-md"> {menuData.saleName} </h1>
          <p className="text-xs  text-gray-400">
            {menuData.content}
          </p>
          <div className="flex items-center text-xs font-extrabold">
            <span className="line-through">{formattedOriginalPrice}원</span>
            <img
              className="w-3 h-3 mx-2"
              src={right}
              alt="오른쪽 화살표"
            />
            <span className="text-red-500">{formattedSellPrice}원</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end ">
        <CountButton menuData={menuData}/>
      </div>
    </div>
  );
};

export default CheckOrder;
