import { useState } from "react";
import deleteBtn from "../../assets/btn/deleteBtn.png"
import minusBtn from "../../assets/btn/minusBtn.png"
import plusBtn from "../../assets/btn/plusBtn.png"


const FirstCountButton = () => {
  const [quantity, setQuantity] = useState<Number>(1);

  const handlePlusClick = () => {
    if (Number(quantity) < 1) {
      setQuantity((prev) => Number(prev) + 1);
    } else {
      setQuantity((prev) => Number(prev) + 1);
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
