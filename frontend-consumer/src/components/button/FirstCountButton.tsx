import { useState } from "react";
import minusBtn from "../../assets/btn/minusBtn.png"
import plusBtn from "../../assets/btn/plusBtn.png"

import { MenuItem } from "../../types/ShopMenuType"

interface CartInfoProps {
  menu: MenuItem;
  quantity: number;
  setQuantity: (quantity: number | ((prevQuantity: number) => number)) => void;
}

const FirstCountButton = ({ menu, quantity, setQuantity }: CartInfoProps) => {

  const handlePlusClick = () => {
    if (Number(quantity) < menu.restStock) {
      setQuantity((prev) => Number(prev) + 1);
    } else {
      setQuantity(Number(menu.restStock));
    }
  };

  const handleMinusClick = () => {
    if (Number(quantity) > 1) {
      setQuantity((prev) => Number(prev) - 1);
    } else {
      setQuantity(0);
    }
  };

  return (
    <div className="between px-3 border-gray-200 border-2 rounded-xl w-[80px] font-bold text-sm py-1 ">
      <img onClick={handleMinusClick} className="w-2" src={minusBtn} alt="빼기" />
      <span className="font-bold">{quantity.toString()}</span>
      <img onClick={handlePlusClick} className="w-2" src={plusBtn} alt="더하기" />
    </div>
  );
};

export default FirstCountButton;
