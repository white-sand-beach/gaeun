import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CartInfo from "../../components/cart/CartInfo";
import BannerSlider from "../../components/navbar/ServiceBanner";
import FirstCountButton from "../../components/button/FirstCountButton";
import AddCartButton from "../../components/button/AddCartButton";
import MenuDetailGetService from "../../services/carts/MenuDetailGetService";
import logo from "../../../public/windows11/LargeTile.scale-100.png";

import { MenuItem } from "../../types/ShopMenuType";

const AddCart = () => {
  const location = useLocation();
  const { saleId, storeId } = location.state as {
    saleId: number;
    storeId: number;
  };
  const [quantity, setQuantity] = useState<number>(1);
  const [menu, setMenu] = useState<MenuItem>({
    saleId: 0,
    imageUrl: "",
    name: "",
    originalPrice: 0,
    sellPrice: 0,
    discountRate: 0,
    content: "",
    restStock: 0,
  });

  useEffect(() => {
    const fetchShopDetailGet = async () => {
      try {
        const response = await MenuDetailGetService({
          saleId: saleId.toString(),
        });
        setMenu(response);
        console.log("메뉴 상세 요청 성공", response);
      } catch (error) {
        console.log("에러발생", error);
      }
    };
    fetchShopDetailGet();
  }, []);

  return (
    <div>
      <div className="h-[150px] center mb-8 ">
        {menu.imageUrl ? (
          <img
            src={menu.imageUrl}
            alt="메뉴 이미지"
            className="object-cover w-full h-[150px]"
          />
        ) : (
          <img src={logo} />
        )}
      </div>
      {/* 음식 정보 */}
      <CartInfo menu={menu} />
      <div className="w-11/12 mx-auto mt-4 mb-4 border-2 border-orange-400 center h-14 rounded-xl">
        <BannerSlider />
      </div>
      <hr className="border-4 border-gray-100" />

      <div className="py-2 border-b-2 center ">
        <p className="font-extrabold mr-44">수량</p>
        <FirstCountButton
          menu={menu}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <hr className="border-4 border-gray-100 " />
      <div className="center">
        <AddCartButton menu={menu} quantity={quantity} storeId={storeId} />
      </div>
    </div>
  );
};

export default AddCart;
