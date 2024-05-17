import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../public/windows11/LargeTile.scale-100.png";
import CartAllDeleteService from "../../services/carts/CartAllDeleteService";

import CheckOrder from "../../components/cart/CheckOrder";
import CheckPayment from "../../components/cart/CheckPayment";
import PaymentButton from "../../components/button/PaymentButton";
import CartGetService from "../../services/carts/CartGetService";
import { CartInfo, CartItem } from "../../types/CartType";

const Cart = () => {
  const [cartInfo, setCartInfo] = useState<CartInfo>({
    storeId: 0,
    storeName: "",
    isOpened: false,
    cartResponseList: [],
    originalTotalPrice: 0,
    discountTotalPrice: 0,
    sellTotalPrice: 0,
  });
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [isQuantityChange, setIsQuantityChange] = useState<boolean>(true);

  useEffect(() => {
    if (isQuantityChange) {
      const fetchCartInfo = async () => {
        try {
          const response = await CartGetService();
          setCartInfo(response);
          setCartData(response.cartResponseList);
          console.log("요청성공");
        } catch (error) {
          console.log("장바구니 비어있거나 실패", error);
        }
      };
      fetchCartInfo();
      setIsQuantityChange(false)
    }
  }, [isQuantityChange]);

  const handleAllDelete = async () => {
    try {
      await CartAllDeleteService();
      setCartData([]);
      console.log("전체 삭제 성공");
    } catch {
      console.log("전체 삭제 실패");
    }
  };

  const handleDeleteItem = (cartId: string) => {
    setCartData((prevData) =>
      prevData.filter((item) => item.cartId !== cartId)
    );
  };

  return (
    <div className="pt-20 pb-8">
      {cartData.length > 0 ? (
        <div>
          <div className="center">
            <div className="border-gray-400 border-2 rounded-lg w-[300px]">
              {/* 가게 로고 및 가게명 전체 삭제 기능 */}
              <div className="between p-2">
                <div className="flex items-center">
                  <img
                    className="w-4 h-4 rounded-full"
                    src={cartInfo.imageURL || logo}
                    alt=""
                  />
                  <p className="ml-2 text-sm font-bold">{cartInfo.storeName}</p>
                </div>
                <button
                  onClick={handleAllDelete}
                  className="font-bold text-gray-400 text-xxxs"
                >
                  전체 삭제
                </button>
              </div>
              <hr />

              {cartData.map((menuData) => (
                <CheckOrder
                  key={menuData.cartId}
                  menuData={menuData}
                  onDelete={handleDeleteItem}
                  setIsQuantityChange={setIsQuantityChange}
                />
              ))}
              <Link to={`/shop/${cartInfo.storeId}`}>
                <div className="center p-2">
                  <div className="text-xs font-extrabold pb-">+ 메뉴추가</div>
                </div>
              </Link>
            </div>
          </div>

          {/* 결제 확인 */}
          <div className="center pt-4">
            <CheckPayment cartInfo={cartInfo} />
          </div>
          <div className="center pt-10">
            <PaymentButton cartInfo={cartInfo} />
          </div>
        </div>
      ) : (
        <div className="h-screen pb-40 center">
          <div className="justify-center items-center">
            <img className="rounded-full" src={logo} alt="로고" />
            <h2 className="text-lg font-bold center">
              장바구니가
              <span className="mx-2 text-3xl font-serif">텅~</span>
              비었습니다
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
