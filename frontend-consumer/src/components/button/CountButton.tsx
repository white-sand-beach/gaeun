import { useState } from "react";
import deleteBtn from "../../assets/btn/deleteBtn.png"
import minusBtn from "../../assets/btn/minusBtn.png"
import plusBtn from "../../assets/btn/plusBtn.png"

import CartDeleteService from "../../services/carts/CartDeleteService";

const CountButton = () => {
  const [quantity, setQuantity] = useState<Number>(1);
  const [showBtn, setShowBtn] = useState<boolean>(true);
  const cartId = 16

  const handlePlusClick = () => {
    if (Number(quantity) < 1) {
      setQuantity((prev) => Number(prev) + 1);
      setShowBtn(true);
    } else {
      setQuantity((prev) => Number(prev) + 1);
    }
  };

  const handleMinusClick = () => {
    if (Number(quantity) > 1) {
      setQuantity((prev) => Number(prev) - 1);
    } else {
      setQuantity(0);
      setShowBtn(false);
    }
  };

  // const handleDeleteClick = async () => {
  //   try {
  //     // Cart를 삭제하는 요청을 보내고 응답을 받음
  //     const response = await CartDeleteService(cartId);
  //     console.log("Cart 삭제 응답:", response);
  //   } catch (error) {
  //     console.error("Cart 삭제 오류:", error);
  //   }
  // };

  return (
    <div className="between px-3 border-gray-200 border-2 rounded-xl w-[80px] font-bold text-sm py-1 ">
      {!showBtn && (
        <img
          className="w-3 h-4 cursor-pointer"
          src={deleteBtn}
          alt="삭제 버튼"
          // onClick={handleDeleteClick}
        />
      )}
      {showBtn && (
        <img onClick={handleMinusClick} className="w-2" src={minusBtn} alt="빼기" />
      )}
      <span className="font-bold">{quantity.toString()}</span>
      <img onClick={handlePlusClick} className="w-2" src={plusBtn} alt="더하기" />
    </div>
  );
};

export default CountButton;
