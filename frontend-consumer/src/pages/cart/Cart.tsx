import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CountButton from "../../components/button/CountButton";
import right from "../../assets/store/right.png";

import CartAllDeleteService from "../../services/carts/CartAllDeleteService";

import CheckOrder from "../../components/cart/CheckOrder";
import CheckPayment from "../../components/cart/CheckPayment";
import PaymentButton from "../../components/button/PaymentButton";
import CartGetService from "../../services/carts/CartGetService";
import { CartInfo, CartItem } from "../../types/CartType"

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

  useEffect(() => {
    const fetchCartInfo = async () => {
      try {
        const response = await CartGetService();
        setCartInfo(response);
        setCartData(response.cartResponseList)
      } catch (error) {
        console.log("장바구니 정보 받아오기 실패", error);
      }
    };
    fetchCartInfo();
  }, []);

  const handleAllDelete = () => {
    try {
    CartAllDeleteService();
    console.log("전체 삭제 성공")
  } catch {
    console.log("전체 삭제 실패")
  }
  }

  return (
    <div className="pt-20 pb-8">
      <div className="center">
        <div className="border-gray-400 border-2 rounded-lg w-[300px]">
          {/* 가게 로고 및 가게명 전체 삭제 기능 */}
          <div className="between p-2">
            <div className="flex items-center">
              <img
                className="w-4 h-4 rounded-full"
                src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
                alt=""
              />
              <p className="ml-2 text-sm font-bold">{cartInfo.storeName}</p>
            </div>
            <button onClick={handleAllDelete} className="font-bold text-gray-400 text-xxxs">전체 삭제</button>
          </div>
          <hr />

          {cartData.map((menuData) => (
            <CheckOrder key={menuData.cartId} menuData={menuData} />
          ))}
          <hr />
          <Link to={`/shop/${cartInfo.storeId}`}>
            <div className="flex items-center justify-center p-2">
              <div className="text-xs font-extrabold">+ 메뉴추가</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 결제 확인 */}
      <div className="center pt-4">
        <CheckPayment cartInfo={cartInfo} />
      </div>
      <div className="center pt-12">
        <PaymentButton />

      </div>
    </div>
  );
};

export default Cart;
