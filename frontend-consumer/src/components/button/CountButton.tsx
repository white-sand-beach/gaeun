import { useState } from "react";
import deleteBtn from "../../assets/btn/deleteBtn.png"
import minusBtn from "../../assets/btn/minusBtn.png"
import plusBtn from "../../assets/btn/plusBtn.png"

import { CartItem } from "../../types/CartType"

interface CheckOrderProps {
  menuData: CartItem;
}

const CountButton = ({ menuData }: CheckOrderProps) => {
  const [quantity, setQuantity] = useState<Number>(menuData.quantity);
  const [showBtn, setShowBtn] = useState<boolean>(true);

  const handlePlusClick = () => {
    if (Number(quantity) < menuData.restStock) {
      setQuantity((prev) => Number(prev) + 1);
      setShowBtn(true);
    } else {
      setQuantity(menuData.restStock);
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

  

  return (
    <div className="between px-3 border-gray-200 border-2 rounded-xl w-[80px] font-bold text-sm py-1 ">
      {!showBtn && (
        <img
          className="w-3 h-4 cursor-pointer"
          src={deleteBtn}
          alt="삭제 버튼"
          
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
