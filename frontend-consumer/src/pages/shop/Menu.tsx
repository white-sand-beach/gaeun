import { useNavigate, useParams } from 'react-router-dom';

import { MenuItem } from "../../types/ShopMenuType";

import right from "../../assets/store/right.png";
import sale from "../../assets/store/sale.png";

const ShopMenu = ({ menu }: { menu: MenuItem }) => {
  const navigate = useNavigate();
  const { Id } = useParams();

  const handleClick = () => {
    navigate('/add-cart', { state: {saleId: menu.saleId, storeId: Id} });
  };

  return (
    <div>
      <div className="m-auto mt-5 center">
        <div onClick={handleClick} className="w-[350px] h-[135px] border-2 rounded-xl px-4 pt-2">
          <div className="between">
            <div>
              <div className="flex items-center space-x-1">
                <img className="w-4" src={sale} alt="세일" />
                <p className="font-bold text-red-500 text-xxxs">
                  지금 {menu.discountRate}% 할인 중
                </p>
              </div>
              <h5 className="mt-1 text-sm font-bold">{menu.name}</h5>
              <div className="h-10 text-xs">
                <p>{menu.content}</p>
              </div>
              <div className="text-xs">
                <div className="flex">
                  <p>가격</p>
                  <div className="flex items-center ml-2 space-x-2 ">
                    <span className="line-through">{menu.originalPrice}원</span>
                    <img className="w-4 h-4" src={right} alt="화살표" />
                    <span className="font-bold text-red-500">
                      {menu.sellPrice}원
                    </span>
                  </div>
                </div>
                <div>
                  <p>남은수량 : {menu.restStock}</p>
                </div>
              </div>
            </div>
            <div className="w-[112px] h-[112px] rounded-lg">
              <img src={menu.imageUrl} alt="음식이미지" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopMenu;
